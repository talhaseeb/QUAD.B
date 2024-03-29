const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

// Route for creating a new item
router.post('/', itemController.createItems);

// Route for getting all items
router.get('/', itemController.getItems);

// Route for updating an item by itemID
router.put('/:itemId', itemController.updateItem);

//Route for deleting an item by itemID
router.delete('/:itemId', itemController.deleteItem);

module.exports = router;
