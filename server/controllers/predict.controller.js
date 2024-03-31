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

    // console.log("Number of guests:", inputData.number_of_guests);

    // Handle completion of Python script
    pythonProcess.on('close', (code) => {
        if (code === 0) {
        // If Python script executed successfully, send prediction as JSON response
    
        // Base estimate (you can adjust this value)
        const baseEstimate = parseInt(predictionData); // Arbitrary value

        // Adjustment factor based on the number of guests
        const adjustmentFactor = inputData.number_of_guests * 0.4; // Example: 0.1 per guest
        
        let priceCategory;

        if (inputData.pricing_high === 1) {
            priceCategory = "High";
        } else if (inputData.pricing_moderate === 1) {
            priceCategory = "Moderate";
        } else {
            priceCategory = "Low";
        }

        // Price adjustment factor
        let priceAdjustment;
        switch (priceCategory) {
            case 'High':
                priceAdjustment = 1.7; // Example: 20% less waste for high-priced items
                break;
            case 'Moderate':
                priceAdjustment = 1; // No adjustment
                break;
            case 'Low':
                priceAdjustment = 0.6; // Example: 20% more waste for low-priced items
                break;
            default:
                priceAdjustment = 1; // Default to no adjustment
        }
        
        // Calculate the estimated food waste
        let foodWasteEstimate = (baseEstimate + adjustmentFactor) * priceAdjustment;

        if(inputData.seasonality_all_seasons===1){
            foodWasteEstimate = foodWasteEstimate - 0.25*foodWasteEstimate;
        }
        else if(inputData.seasonality_summer===1){
            foodWasteEstimate = foodWasteEstimate - 0.15*foodWasteEstimate;
        }
        else{
            foodWasteEstimate = foodWasteEstimate - 0.2*foodWasteEstimate;
        }

        // Ensure the estimate is less than the quantity of raw material
        foodWasteEstimate = Math.round(Math.min(foodWasteEstimate, 0.3*inputData.quantity_of_food));



        res.json({ prediction: foodWasteEstimate });
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