const express = require('express');
const bodyParser = require('body-parser');
const predictController = require('./predict.controller');

const router = express.Router();

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Route to handle POST requests for predictions
router.post('/predict', async (req, res) => {
    try {
        // Assuming user input is in req.body.data
        const inputData = req.body.data;

        // Make predictions using the controller function
        const predictions = await predictController.predict(inputData);

        // Send the predictions as the response
        res.json({ predictions });
    } catch (error) {
        console.error('Prediction error:', error);
        res.status(500).json({ error: 'Failed to make predictions' });
    }
});

module.exports = router;
