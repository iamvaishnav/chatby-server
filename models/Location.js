const objectID = require('mongodb').ObjectID;

let location;

class Location {
    constructor(userID, coordinates) {
        this.userID = userID;
        this.coordinates = coordinates;
    }

    static async injectDB(conn) {
        try {
            location = await conn.db('chatby').collection('location');
        } catch (e) {
            console.error(`Unable to establish a collection handle : ${e}`);
        }
    }
}

module.exports = Location;
