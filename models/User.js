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
}

module.exports = User;
