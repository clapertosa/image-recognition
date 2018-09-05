const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const knex = require("../../db/knex");
const validateSignup = require("../../validations/signup");

router.post("/", (req, res) => {
  const { isValid, errors } = validateSignup(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email.trim();
  let password = req.body.password;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      password = hash;
    });
  });

  knex
    .select("email")
    .from("users")
    .where("email", email)
    .then(user => {
      if (user[0]) {
        return res.status(300).json("Email already exists");
      } else {
        knex("users")
          .insert({ email: email, password: password, created_at: new Date() })
          .then(() => res.status(200).json("User registered"))
          .catch(error => res.status(400).json(error));
      }
    })
    .catch(error => res.status(400).json(error));
});

module.exports = router;
