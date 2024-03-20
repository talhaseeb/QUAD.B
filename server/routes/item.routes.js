const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

// Route for creating a new item
router.post('/', itemController.createItem);

// Route for getting all items
router.get('/', itemController.getItems);

// Route for updating a item by itemID
router.put('/:itemId', itemController.updateItem);

module.exports = router;
