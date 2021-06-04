const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');

const connect = require('./utils/database');

const User = require('./models/User');
const Groups = require('./models/Groups');
const Chats = require('./models/Chats');
const Location = require('./models/Location');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/', (req, res) => {
    return res.json({ message: 'hello world' });
});
connect
    .then(async (client) => {
        console.log('connected to mongodb');
        await User.injectDB(client);
        await Groups.injectDB(client);
        await Chats.injectDB(client);
        await Location.injectDB(client);

        app.listen(8080);
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
