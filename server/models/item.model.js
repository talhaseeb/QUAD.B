const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemId: {
        type: Number,
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    // postId: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Post',
    // }],
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
