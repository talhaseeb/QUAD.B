const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Route for creating a new user
router.post('/', userController.createUser);

// Other routes for user-related operations below

module.exports = router;
