const bcrypt = require('bcrypt'); // Import bcrypt for password encryption
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
    // Assuming req.body contains user data including plaintext password
    try {
        // Encrypt the password before saving the user
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds

        // Create a new user object with the encrypted password
        const newUser = new User({
            address: req.body.address,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword, // Save the hashed password
            myFavs: [],
            isPartner: req.body.isPartner || false, // Set default value if not provided
            active: true // Assuming all new users are active
        });

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
        
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* Controller function - GET all users */
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: "Users retrieved successfully", users: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/* Controller function - UPDATE a user by userId */
exports.updateUser = async (req, res) => {
    const userId = req.params.userId;
    const updates = req.body;
    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
