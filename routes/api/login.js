const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const knex = require("../../db/knex");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const validateLogin = require("../../validations/login");

router.post("/", (req, res) => {
  const { isValid, errors } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email.trim();
  const password = req.body.password;

  knex("users")
    .select("id", "email", "password", "activated", "recognitions")
    .where("email", email)
    .then(user => {
      if (!user[0]) {
        return res.status(401).json("Wrong email or password");
      } else if (!user[0].activated) {
        return res
          .status(403)
          .json("You need to confirm your email. Check your inbox");
      } else {
        bcrypt
          .compare(password, user[0].password.toString())
          .then(match => {
            if (match) {
              //USER MATCH
              console.log(user[0]);
              const payload = {
                id: user[0].id,
                email: user[0].email,
                activated: user[0].activated
              };
              //SIGN TOKEN
              jwt.sign(
                payload,
                keys.secret,
                { expiresIn: "2h" },
                (err, token) => {
                  if (err) {
                    return res.status(400).json(err);
                  }
                  return res.json({ success: true, token: `Bearer ${token}` });
                }
              );
            } else {
              return res.status(401).json("Wrong email or password");
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
