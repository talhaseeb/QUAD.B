const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Route for creating a new user
router.post('/', userController.createUser);

// Route for getting all users
router.get('/', userController.getUsers);

// Route for updating a user by userId
router.put('/:userId', userController.updateUser);

module.exports = router;
