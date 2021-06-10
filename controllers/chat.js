const Groups = require('../models/Groups');
const Location = require('../models/Location');
const Chat = require('../models/Chats');

exports.getAllChats = async (req, res) => {
    const userId = req.userID;
    const chats = await Groups.fetchAllUserGroups(userId);

    res.status(200).json({ userId, chats });
};

exports.getChat = async (req, res) => {
    const chatId = req.body.chatID;
    const chat = await Chat.fetchChatById(chatId);
    res.status(200).json({ chatID: chatId, chat });
};

exports.discoverNearby = async (req, res) => {
    const userId = req.userID;
    const usersNearby = await Location.fetchNearbyUsers(userId);

    res.status(200).json({ userId, usersNearby });
};

exports.createNewChat = async (req, res) => {
    const members = [req.userID, req.body.recipient];
    const newGroup = new Groups(members);

    let id;
    try {
        id = await newGroup.save();
        const newChat = new Chat(id);
        await newChat.save();
    } catch (error) {
        return res.status(500).json();
    }

    res.status(201).json({ chatID: id });
};

exports.createMessage = async (req, res) => {
    const chatId = req.body.chatID;
    const userId = req.userID;
    const message = req.body.message;

    try {
        await Chat.sendMessage(chatId, userId, message);
    } catch (error) {
        return res.status(500).json();
    }

    res.status(201).json();
};
