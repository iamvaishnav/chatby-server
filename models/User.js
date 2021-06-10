const objectID = require('mongodb').ObjectID;

let user;

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static async injectDB(conn) {
        try {
            user = await conn.db('chatby').collection('users');
        } catch (e) {
            console.error(`Unable to establish a collection handle : ${e}`);
        }
    }

    async save() {
        try {
            await user.insertOne(this);
        } catch {
            console.log('Some error while creating the user');
        }
    }
}

module.exports = User;
