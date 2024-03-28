const fs = require('fs');

const { spawn } = require('child_process');

// Define a function to handle the predict route
const predict = (req, res) => {
    // Define input data
    const inputData = req.body;

    // Call the main.py script using spawn
    const pythonProcess = spawn('python', ['./ml_scripts/main.py']);

    let predictionData = '';

    // Send input data to Python script
    pythonProcess.stdin.write(JSON.stringify(inputData));
    pythonProcess.stdin.end();

    // Handle data from Python script
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Data received from Python script: ${data}`);
        predictionData += data.toString();
    });

    // Handle errors from Python script
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python script: ${data}`);
        res.status(500).json({ error: 'Internal Server Error' }); // Send error response
    });

    // Handle completion of Python script
    pythonProcess.on('close', (code) => {
        if (code === 0) {
        // If Python script executed successfully, send prediction as JSON response
        res.json({ prediction: predictionData });
        } else {
        // If Python script encountered an error, send error response
        console.error(`Python script exited with code ${code}`);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

module.exports = {
  predict,
};