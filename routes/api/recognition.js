const express = require("express");
const multer = require("multer");
const upload = multer();
const axios = require("../../axiosServerInstance");
const passport = require("passport");
const knex = require("../../db/knex");
const router = express.Router();

//* Models
// Face detection: a403429f2ddf4b49b307e318f00e528b
// Objects, general: aaa03c23b3724a16a56b629203edc62c
// NSFW: e9576d86d2004ed1a38ba0cf39ecb4b1

router.post("/faces", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json("No file provided");
  } else if (
    req.file.mimetype !== "image/png" &&
    req.file.mimetype !== "image/jpeg"
  ) {
    return res.status(400).json("File type not valid");
  }

  const imageFile = req.file.buffer.toString("base64");

  axios
    .post("/a403429f2ddf4b49b307e318f00e528b/outputs", {
      inputs: [
        {
          data: {
            image: {
              base64: imageFile
            }
          }
        }
      ]
    })
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

  const imageFile = req.file.buffer.toString("base64");
  axios
    .post("/aaa03c23b3724a16a56b629203edc62c/outputs", {
      inputs: [
        {
          data: {
            image: {
              base64: imageFile
            }
          }
        }
      ]
    })
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

  const imageFile = req.file.buffer.toString("base64");
  axios
    .post("/e9576d86d2004ed1a38ba0cf39ecb4b1/outputs", {
      inputs: [
        {
          data: {
            image: {
              base64: imageFile
            }
          }
        }
      ]
    })
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
