const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    myFavs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Partner'
    }],
    isPartner: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Set _id as primary key
userSchema.set('_id', mongoose.Schema.Types.ObjectId);

// // Define unique index only for email and phone fields
// userSchema.index({ email: 1 }, { unique: true });
// userSchema.index({ phone: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
