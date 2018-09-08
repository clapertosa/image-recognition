import axios from "axios";

const token = localStorage.token;
const instance = axios.create({
  baseURL: `http${process.env.NODE_ENV === "production" ? "s" : ""}://${
    window.location.host
  }`
});

export default instance;
