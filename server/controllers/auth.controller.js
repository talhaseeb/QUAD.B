const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            // If user not found, send 404 Not Found status code
            return res.status(404).send('User not found');
        }

        // Compare the provided password with the hashed password stored in the database
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                // Send 500 Internal Server Error status code
                return res.status(500).send('Internal Server Error');
            }
            if (result) {
                // If passwords match, send 200 OK status code
                const { _id, isPartner } = user;
                return res.status(200).json({ message: 'Login successful', _id, isPartner });
            } else {
                // If passwords do not match, send 401 Unauthorized status code
                return res.status(401).send('Invalid credentials');
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        // Send 500 Internal Server Error status code
        res.status(500).send('Internal Server Error');
    }
};
