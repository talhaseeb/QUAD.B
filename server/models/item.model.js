const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    images: [{
        type: String
    }],
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner'
    }
}, {
    timestamps: true
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;