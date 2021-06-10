const objectID = require('mongodb').ObjectID;
const geoFence = require('../utils/geofence');

let location;

class Location {
    constructor(userID, coordinates) {
        this.userID = userID;
        this.coordinates = {};
    }

    static async injectDB(conn) {
        try {
            location = await conn.db('chatby').collection('location');
        } catch (e) {
            console.error(`Unable to establish a collection handle : ${e}`);
        }
    }

    async save() {
        try {
            await location.insertOne(this);
        } catch {
            console.log('Some error while creating the user location');
        }
    }

    static async fetchNearbyUsers(userId) {
        try {
            const result = await location.findOne(
                { userID: userId },
                {
                    projection: {
                        _id: 0,
                        userID: 0,
                    },
                }
            );

            const { lat, lon } = result.coordinates;
            const allUsers = await location
                .find({
                    userID: {
                        $ne: userId,
                    },
                })
                .toArray();

            const usersNearby = allUsers.filter((location) => {
                if (geoFence(location, lat, lon)) {
                    return location;
                }
            });

            return usersNearby;
        } catch (error) {
            console.log(error);
            console.log('Some error while fetching users');
        }
    }
}

module.exports = Location;
