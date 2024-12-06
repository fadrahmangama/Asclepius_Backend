const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
require("dotenv").config();

const MODEL_URL = process.env.MODEL_URL;

let model = null;

const loadModel = async () => {
  try {
    if (!model) {
      console.log("Loading model from cloud storage");
      model = await tf.loadGraphModel(MODEL_URL);
      console.log("Model loaded successfully");
    }
    return model;
  } catch (error) {
    console.error(`Error loading model: ${error.message}`);
    throw new Error("Failed to load graph model");
  }
};

const predictCancer = async (imagePath) => {
  try {
    const model = await loadModel();
    const imageTensor = tf.node
      .decodeImage(fs.readFileSync(imagePath))
      .resizeNearestNeighbor([224, 224])
      .div(255.0)
      .expandDims(0);
    const [prediction] = model
      .execute({ MobilenetV3large_input: imageTensor })
      .dataSync();
    return prediction >= 0.58;
  } catch (error) {
    console.error("Prediction Error:", error.message);
    throw new Error("Prediction failed");
  }
};

module.exports = { predictCancer };
