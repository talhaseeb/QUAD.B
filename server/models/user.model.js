const mongoose = require('mongoose');
//Fields - userID,  address, name, email, phone, password, myFavs, isPartner, active
const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
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
        required: true,
        unique: true
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

const User = mongoose.model('User', userSchema);

module.exports = User;
