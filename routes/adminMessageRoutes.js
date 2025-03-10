const express = require('express');
const router = express.Router();
const { getAllMessages, deleteMessage } = require('../controllers/adminMessageController');

router.get('/', getAllMessages);
router.delete('/:messageId', deleteMessage);

module.exports = router; 