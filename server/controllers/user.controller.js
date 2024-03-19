const User = require('../models/user.model');
const Partner = require('../models/partner.model');

// Function to generate a new partnerId
async function generatePartnerId() {
    // Find the maximum partnerId in the collection
    const maxPartner = await Partner.findOne().sort({ partnerId: -1 });
    let nextPartnerId = 1;
    if (maxPartner) {
        nextPartnerId = maxPartner.partnerId + 1;
    }
    return nextPartnerId;
}

/* Controller function - CREATE (POST) a new user */
exports.createUser = async (req, res) => {
    // Assuming req.body contains user data
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        
        // Check if the user is a partner
        if (req.body.isPartner) {
            // Generate a new partnerId
            const partnerId = await generatePartnerId();
            
            // Create a corresponding partner
            const newPartner = new Partner({
                partnerId: partnerId,
                bannerImage: req.body.bannerImage,
                userId: savedUser._id // Save the user's ObjectId as userId in the partner document
            });
            await newPartner.save();
        }
        
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* Controller function - GET all users */
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* Controller function - UPDATE a user by userId */
exports.updateUser = async (req, res) => {
    const userId = req.params.userId;
    const updates = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate({ userId }, updates, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Other functions for user-related operations TBD
