const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

// Route for creating a new order
router.post('/', orderController.createOrder);

// Route for getting all orders
router.get('/', orderController.getOrders);

// Route for updating a order by orderD
router.put('/:orderId', orderController.updateOrder);

module.exports = router;
