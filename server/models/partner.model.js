const mongoose = require('mongoose');
//Fields - partnerID, bannerImage, socials, ordersPlaced, userId
const partnerSchema = new mongoose.Schema({
    // partnerId: {
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    bannerImage: {
        type: String,
        required: false
    },
    logo: {
        type: String,
        required: false
    },
    short_description: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    tags: {
        type: [String], // Array of strings
        default: [] // Default empty array
    },
    socials: {
        type: String
    },
    ordersPlaced: {
        type: Number,
        default: 0
    },
    netItemsCount: {
        type: Number,
        default: 0
    },
    partnerType: {
        type: String,
        enum: ['store', 'restaurant', 'donation center'] // Assuming predefined partner types
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Set _id as primary key
 partnerSchema.set('_id', mongoose.Schema.Types.ObjectId);

const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;
