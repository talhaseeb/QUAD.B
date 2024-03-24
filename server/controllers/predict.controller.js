const tf = require('@tensorflow/tfjs-node');
const { loadLayersModel } = require('@tensorflow/tfjs-layers');

let model;

async function loadModel() {
    // Load the model from the .h5 file
    model = await loadLayersModel('C:\Users\Arnab\Documents\GitHub\QUAD.B\server\ml_models\ann_model_v1.h5');
}

async function predict(inputData) {
    try {
        // Convert input data to a tensor
        const inputTensor = tf.tensor(inputData);

        // Make predictions using the model
        const predictions = model.predict(inputTensor);

        // Convert predictions tensor to JSON
        const predictionsJson = predictions.arraySync();
        
        return predictionsJson;
    } catch (error) {
        console.error('Prediction error:', error);
        throw new Error('Failed to make predictions');
    }
}

module.exports = {
    loadModel,
    predict
};
