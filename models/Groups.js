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
}

module.exports = Groups;
