const Item = require('../models/item.model');
const Partner = require('../models/partner.model');

/* Controller function - CREATE (POST) a new item */
exports.createItems = async (req, res) => {
    try {
        const newItem = await Item.create(req.body);

        // Update netItemsCount for the respective Partner
        await Partner.findByIdAndUpdate(newItem.partnerId, { $inc: { netItemsCount: newItem.quantity } });

        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
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
    const { quantity, price, title, description, imageUrl, postId, partnerId } = req.body;
    const { itemId } = req.params;
    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found!" });
        }

        // Get the difference in quantity for updating netItemsCount
        const oldQuantity = item.quantity;
        const quantityDifference = quantity - oldQuantity;

        // Update other fields
        item.quantity = quantity;
        item.price = price;
        item.title = title;
        item.description = description;
        item.postId = postId; // Update postId field

        // Push new imageUrl to the existing images array
        if (imageUrl) {
            item.images.push(imageUrl);
        }

        // Save the updated item
        await item.save();

        // Update netItemsCount for the respective Partner
        await Partner.findByIdAndUpdate(partnerId, { $inc: { netItemsCount: quantityDifference } });

        return res.status(200).json({ message: "Item updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error: " + error });
    }
};

// Controller function to delete an item by itemId
exports.deleteItem = async (req, res) => {
    const { itemId } = req.params;
    try {
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

