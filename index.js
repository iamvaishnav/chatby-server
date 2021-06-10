const express = require('express');
const bodyParser = require('body-parser');
const socket = require('./utils/socket');

const connect = require('./utils/database');

const User = require('./models/User');
const Groups = require('./models/Groups');
const Chats = require('./models/Chats');
const Location = require('./models/Location');

//routes
const chatRoutes = require('./routes/chat');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/', chatRoutes);
connect
    .then(async (client) => {
        console.log('connected to mongodb');
        await User.injectDB(client);
        await Groups.injectDB(client);
        await Chats.injectDB(client);
        await Location.injectDB(client);

        const server = app.listen(8080);
        io = socket.init(server);
        io.on('connection', (socket) => {
            console.log('New connection');
        });
    })
    .catch((err) => {
        console.log(err);
        process.exit(1);
    });
