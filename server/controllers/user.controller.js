const User = require('../models/user.model');
const Partner = require('../models/partner.model');
const bcrypt = require('bcrypt');

// POST - Create a new user and partner if applicable
exports.createUser = async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user with hashed password
        const newUser = new User({
            address: req.body.address,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedPassword, // Store the hashed password
            isPartner: req.body.isPartner || false // Default to false if isPartner not provided
        });
        await newUser.save();
        let partnerId = null;
        // Check if user should be a partner
        if (req.body.isPartner) {
            // Validate partner type
            const partnerType = req.body.partnerType;
            if (!['store', 'restaurant', 'donation center'].includes(partnerType)) {
                return res.status(400).json({ message: 'Invalid partner type' });
            }

            // Create a new partner
            const newPartner = new Partner({
                bannerImage: req.body.bannerImage || null,
                logo: req.body.logo || null,
                socials: req.body.socials || null,
                partnerType: partnerType,
                userId: newUser._id // Assign the user's ID
            });
            await newPartner.save();

            // Update user to be a partner
            newUser.isPartner = true;
            await newUser.save();
            partnerId = newPartner._id
        }

        res.status(201).json({ ...newUser, partnerId });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET - Retrieve all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, message: 'Users retrieved successfully', data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// PUT - Update a user by ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User updated successfully', data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
