const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, getLoggedInUsers } = require('../controllers/adminUserController');

router.get('/', getAllUsers);
router.delete('/:userId', deleteUser);
router.get('/logged-in', getLoggedInUsers);

module.exports = router; 