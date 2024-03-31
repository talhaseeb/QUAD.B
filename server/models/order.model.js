const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    itemId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    }],
    shortDescription: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMode: {
        type: String,
        enum: ['Pre Paid', 'Pay on pick up'], // Add other modes as needed
        required: true
    },
    isOrderIDVerified: {
        type: Boolean,
        required: true
    },
    paymentStatus: {
        type: Boolean,
        required: true
    },
    uniqueOrderId: {
        type: String
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;