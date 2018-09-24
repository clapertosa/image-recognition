const express = require("express");
const multer = require("multer");
const upload = multer();
const axios = require("../../axiosServerInstance");
const passport = require("passport");
const knex = require("../../db/knex");
const router = express.Router();

router.post("/faces", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json("No file provided");
  } else if (
    req.file.mimetype !== "image/png" &&
    req.file.mimetype !== "image/jpeg"
  ) {
    return res.status(400).json("File type not valid");
  }

  const imageFile = req.file.buffer;
  axios
    .post("/face/locate", imageFile)
    .then(response => res.status(200).json(response.data))
    .catch(error => res.status(400).json(error.response.data));
});

router.post("/describe", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json("No file provided");
  } else if (
    req.file.mimetype !== "image/png" &&
    req.file.mimetype !== "image/jpeg"
  ) {
    return res.status(400).json("File type not valid");
  }

  const imageFile = req.file.buffer;
  axios
    .post("/recognize/describe", imageFile)
    .then(response => res.status(200).json(response.data))
    .catch(error => res.status(400).json(error.response.data));
});

router.post("/detect", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json("No file provided");
  } else if (
    req.file.mimetype !== "image/png" &&
    req.file.mimetype !== "image/jpeg"
  ) {
    return res.status(400).json("File type not valid");
  }

  const imageFile = req.file.buffer;
  axios
    .post("/recognize/detect-objects", imageFile)
    .then(response => res.status(200).json(response.data))
    .catch(error => res.status(400).json(error.response.data));
});

router.post("/nsfw", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json("No file provided");
  } else if (
    req.file.mimetype !== "image/png" &&
    req.file.mimetype !== "image/jpeg"
  ) {
    return res.status(400).json("File type not valid");
  }

  const imageFile = req.file.buffer;
  axios
    .post("/nsfw/classify", imageFile)
    .then(response => res.status(200).json(response.data))
    .catch(error => res.status(400).json(error.response.data));
});

router.put(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    knex("users")
      .update("created_at", knex.fn.now())
      .and.increment("recognitions", 1)
      .where("id", req.user.id)
      .then(() =>
        res.status(200).json({
          recognitions: req.user.recognitions + 1,
          message: "Recognitions incremented"
        })
      )
      .catch(() => res.status(400).json("An error occurred"));
  }
);

router.post(
  "/get",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    knex("users")
      .select("recognitions")
      .where("id", req.user.id)
      .then(response => res.status(200).json(response[0].recognitions))
      .catch(error => res.status(400).json(error));
  }
);

module.exports = router;
