const axios = require("axios");
const keys = require("./config/keys");

const instance = axios.create({
  baseURL: "https://api.clarifai.com/v2/models",
  headers: { Authorization: `Key ${keys.clarifaiApiKey}` }
});

module.exports = instance;
