const objectID = require('mongodb').ObjectID;

let chats;

class Chats {
    constructor(id) {
        this._id = objectID(id);
        this.messages = [];
    }

    static async injectDB(conn) {
        try {
            chats = await conn.db('chatby').collection('chats');
        } catch (e) {
            console.error(`Unable to establish a collection handle : ${e}`);
        }
    }

    async save() {
        try {
            await chats.insertOne(this);
        } catch {
            console.log('Some error while creating chat');
        }
    }

    static async fetchChatById(chatID) {
        try {
            const chat = await chats.findOne({ _id: objectID(chatID) });
            return chat;
        } catch (error) {
            console.log(error);
        }
    }

    static async sendMessage(chatID, userID, message) {
        try {
            const messageInfo = {
                author: userID,
                timestamp: new Date(),
                message,
            };

            await chats.updateOne(
                { _id: objectID(chatID) },
                {
                    $push: { messages: messageInfo },
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Chats;
