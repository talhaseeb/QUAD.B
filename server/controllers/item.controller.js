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

/* Controller function - GET items */
exports.getItems = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        let items;
        if (itemId) {
            // If itemId is provided, fetch a single item by ID
            items = await Item.findById(itemId);
            if (!items) {
                return res.status(404).json({ message: 'Item not found' });
            } else {
                return res.status(200).json({ message: 'Item found', item: items });
            }
        } else {
            // If itemId is not provided, fetch all items
            items = await Item.find();
            return res.status(200).json({ message: 'All items fetched successfully', items: items });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function - GET all items belonging to a specific partner
exports.getItemsByPartnerId = async (req, res) => {
    const partnerId = req.params.partnerId;
    try {
        const items = await Item.find({ partnerId: partnerId });
        res.status(200).json({ success: true, message: "Items belonging to partner fetched successfully", items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message }); 
    }
};

/* Controller function - UPDATE a item by itemId */
/* Controller function - UPDATE a item by itemId */
exports.updateItem = async (req, res) => {
    const { quantity, price, title, description, imageUrl, postId, partnerId } = req.body;
    const { itemId } = req.params;
    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found!" });
        }
        var quantityDifference = 0;
        // Update fields only if they are provided in the request body
        if (quantity !== undefined) {
            // Get the difference in quantity for updating netItemsCount
            const oldQuantity = item.quantity;
            quantityDifference = quantity - oldQuantity;
            item.quantity = quantity;
        }
        if (price !== undefined) {
            item.price = price;
        }
        if (title !== undefined) {
            item.title = title;
        }
        if (description !== undefined) {
            item.description = description;
        }
        if (postId !== undefined) {
            item.postId = postId;
        }
        if (imageUrl) {
            item.images.push(imageUrl);
        }

        // Save the updated item
        await item.save();

        // Update netItemsCount for the respective Partner
        if (quantityDifference) {
            var pID = item.partnerId
            // console.log("Difference: ", quantityDifference);
            await Partner.findByIdAndUpdate(pID, { $inc: { netItemsCount: quantityDifference } });
        }

    return res.status(200).json({
        message: "Item updated successfully!",
        quantityDifference: quantityDifference,
        partnerId: pID
    });
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

