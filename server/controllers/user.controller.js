const User = require('../models/user.model');

/* Controller function - CREATE (POST) a new user */
exports.createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
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
