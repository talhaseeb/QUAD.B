const Item = require('../models/item.model');

/* Controller function - CREATE (POST) a new item */
exports.createItem = async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* Controller function - GET all items */
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* Controller function - UPDATE a item by itemId */
exports.updateItem = async (req, res) => {
    const itemId = req.params.itemId;
    const updates = req.body;
    try {
        const updatedItem = await User.findOneAndUpdate({ itemId }, updates, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Other functions for item-related operations TBD
