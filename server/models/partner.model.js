const mongoose = require('mongoose');
//Fields - partnerID, bannerImage, socials, ordersPlaced, userId
const partnerSchema = new mongoose.Schema({
    partnerId: {
        type: Number,
        required: true,
        unique: true
    },
    bannerImage: {
        type: String,
        required: false
    },
    socials: {
        type: String
    },
    ordersPlaced: {
        type: Number,
        default: 0
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
