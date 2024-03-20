const Order = require('../models/order.model');

/* Controller function - CREATE (POST) a new order */
exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* Controller function - GET all orders */
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* Controller function - UPDATE a order by orderId */
exports.updateOrder = async (req, res) => {
    const orderId = req.params.orderId;
    const updates = req.body;
    try {
        const updatedOrder = await User.findOneAndUpdate({ orderId }, updates, { new: true });
        res.status(200).json(orderItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Other functions for order-related operations TBD
