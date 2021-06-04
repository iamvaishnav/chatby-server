const mongoDB = require('mongodb');

const mongoClient = mongoDB.MongoClient;

const URI =
    'mongodb+srv://vaishnav:13579@cluster0.acy7w.mongodb.net/chatby?retryWrites=true&w=majority';

const connect = mongoClient.connect(URI, {
    wtimeout: 2500,
    w: 'majority',
    useUnifiedTopology: true,
});

module.exports = connect;
