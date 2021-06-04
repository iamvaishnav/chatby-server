const objectID = require('mongodb').ObjectID;

let chats;

class Chats {
    constructor(id) {
        this._id = objectID(id);
        this.messages = {};
    }

    static async injectDB(conn) {
        try {
            chats = await conn.db('chatby').collection('chats');
        } catch (e) {
            console.error(`Unable to establish a collection handle : ${e}`);
        }
    }
}

module.exports = Chats;
