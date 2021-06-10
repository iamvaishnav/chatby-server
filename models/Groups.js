const objectID = require('mongodb').ObjectID;

let groups;

class Groups {
    constructor(members) {
        this.members = members;
    }

    static async injectDB(conn) {
        try {
            groups = await conn.db('chatby').collection('groups');
        } catch (e) {
            console.error(`Unable to establish a collection handle : ${e}`);
        }
    }

    async save() {
        try {
            const { ops } = await groups.insertOne(this);
            return ops[0]._id;
        } catch {
            console.log('Some error while creating group');
        }
    }

    static async fetchAllUserGroups(userId) {
        try {
            const groupsList = await groups.find({ members: userId }).toArray();
            return groupsList;
        } catch (error) {
            console.log('Some error while fetching user chats');
        }
    }
}

module.exports = Groups;
