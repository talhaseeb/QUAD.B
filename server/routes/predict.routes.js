const express = require('express');
const bodyParser = require('body-parser');
const predictController = require('../controllers/predict.controller');
// const { spawn } = require('child_process');

const router = express.Router();

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Route to handle POST requests for predictions
router.post('/predict', predictController.predict);

module.exports = router;