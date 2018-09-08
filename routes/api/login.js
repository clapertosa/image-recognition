const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const knex = require("../../db/knex");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

router.post("/", (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password;

  knex("users")
    .select("id", "email", "password")
    .where("email", email)
    .then(user => {
      if (!user) {
        return res.status(401).json("Wrong email or password");
      } else {
        bcrypt
          .compare(password, user[0].password.toString())
          .then(match => {
            if (match) {
              //USER MATCH
              const payload = { id: user[0].id, email: user[0].email };
              //SIGN TOKEN
              jwt.sign(
                payload,
                keys.secret,
                { expiresIn: "2h" },
                (err, token) => {
                  if (err) {
                    res.status(400).json(err);
                  }
                  res.json({ success: true, token: `Bearer ${token}` });
                }
              );
            } else {
              res.status(400).json("Wrong email or password");
            }
          })
          .catch(error => res.status(400).json(error));
      }
    })
    .catch(error => {
      return res.status(400).json(error);
    });
});

module.exports = router;