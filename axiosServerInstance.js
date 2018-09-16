const axios = require("axios");
const keys = require("./config/keys");

const instance = axios.create({
  baseURL: "https://api.cloudmersive.com/image",
  headers: { Apikey: keys.cloudmersiveApiKey }
});

module.exports = instance;
