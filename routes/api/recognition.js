const express = require("express");
const multer = require("multer");
const upload = multer();
const axios = require("../../axiosServerInstance");
const router = express.Router();

router.post("/faces", upload.single("image"), (req, res) => {
  const imageFile = req.file.buffer;
  axios
    .post("/face/locate", imageFile)
    .then(response => res.status(200).json(response.data))
    .catch(error => res.status(400).json(error.response.data));
});

router.post("/describe", upload.single("image"), (req, res) => {
  const imageFile = req.file.buffer;
  axios
    .post("/recognize/describe", imageFile)
    .then(response => res.status(200).json(response.data))
    .catch(error => res.status(400).json(error.response.data));
});

router.post("/detect", upload.single("image"), (req, res) => {
  const imageFile = req.file.buffer;
  axios
    .post("/recognize/detect-objects", imageFile)
    .then(response => res.status(200).json(response.data))
    .catch(error => res.status(400).json(error.response.data));
});

router.post("/nsfw", upload.single("image"), (req, res) => {
  const imageFile = req.file.buffer;
  axios
    .post("/nsfw/classify", imageFile)
    .then(response => res.status(200).json(response.data))
    .catch(error => res.status(400).json(error.response.data));
});

module.exports = router;