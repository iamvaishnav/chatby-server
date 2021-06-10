const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chat');

router.get('/chats', chatController.getAllChats);
router.get('/discover', chatController.discoverNearby);
router.get('/chat/:chatID', chatController.getChat);
router.post('/chats/new', chatController.createNewChat);
router.post('/chats', chatController.createMessage);
module.exports = router;
