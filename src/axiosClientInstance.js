import axios from "axios";

const instance = axios.create({
  baseURL: `http${process.env.NODE_ENV === "production" ? "s" : ""}://${
    window.location.host
  }`
});

export default instance;
