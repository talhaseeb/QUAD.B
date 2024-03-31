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
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: "Order not found!" });

        // Update other fields
        for (const key in updates) {
            if (key !== 'postId') {
                order[key] = updates[key];
            }
        }

        // Update postId array
        if (updates.postId) {
            order.postId.push(updates.postId);
        }

        // Save the updated order
        const updatedOrder = await order.save();

        return res.status(200).json({ message: "Order updated successfully!", updatedOrder });
    }
 } catch (error) {
        res.status(500).json({ error: "Error: " + error.message });
    }
    
};

// Other functions for order-related operations TBD
