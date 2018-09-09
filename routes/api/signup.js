const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const knex = require("../../db/knex");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const sgMail = require("@sendgrid/mail");
const keys = require("../../config/keys");
const validateSignup = require("../../validations/signup");

router.post("/", (req, res) => {
  const { isValid, errors } = validateSignup(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email.trim();
  let password = req.body.password;

  // Encrypt password
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
        return res.status(403).json("Email already exists");
      } else {
        // Create user in DB
        knex("users")
          .insert({ email: email, password: password, created_at: new Date() })
          .then(() => {
            // NEW EMAIL TO SEND
            const token = jwt.sign({ id: id, email: email }, keys.secret, {
              expiresIn: "2d"
            });

            // const sgMail = require("@sendgrid/mail");
            // sgMail.setApiKey(process.env.SENDGRID_API_KEY || keys.sendgridApiKey);
            // const msg = {
            //   to: email,
            //   from: "no-reply@image-recognition.com",
            //   subject: "Image Recognition - Email validation",
            //   text:
            // "Click on the link to activate your account: " + 'https://' + window.location.host + '/validate?' + token,
            //   html:
            // `<p>Click on the link to activate your account: <a href="https://${
            //   window.location.host
            // }/validate?'${token}">https://${
            //   window.location.host
            // }/validate?'${token}</a></p>`;
            // };
            // sgMail.send(msg);
            res.status(200).json("User registered");
          })
          .catch(error => res.status(400).json(error));
      }
    })
    .catch(error => res.status(400).json(error));
});

router.post("/validate", (req, res) => {
  let decodedUser;
  try {
    decodedUser = jwtDecode(req.query.token);
  } catch (e) {
    return res.status(400).json("Invalid token");
  }
  const id = decodedUser.id;
  const email = decodedUser.email;
  const activated = decodedUser.activated;
  const exp = decodedUser.exp;
  const currentTime = Date.now() / 1000;

  if (exp < currentTime) {
    // IF USER IS ALREADY ACTIVATED
    if (activated) {
      return res.status(403).json("User already activated");
    }
    // ELSE, NEW EMAIL TO SEND
    const token = jwt.sign({ id: id, email: email }, keys.secret, {
      expiresIn: "2d"
    });

    // const sgMail = require("@sendgrid/mail");
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY || keys.sendgridApiKey);
    // const msg = {
    //   to: email,
    //   from: "no-reply@image-recognition.com",
    //   subject: "Image Recognition - Email validation",
    //   text:
    // "Click on the link to activate your account: " + 'https://' + window.location.host + '/validate?token=' + token,
    //   html:
    // `<p>Click on the link to activate your account: <a href="https://${
    //   window.location.host
    // }/validate?token='${token}">https://${
    //   window.location.host
    // }/validate?'${token}</a></p>`;
    // };
    // sgMail.send(msg);

    return res.json(
      "Validation expired, a new email has been sent to " + email
    );
  } else {
    knex("users")
      .select("activated")
      .where({ id: id, email: email })
      .then(user => {
        if (!user[0]) {
          return res.status(401).json("User doesn't exists");
        } else if (user[0].activated) {
          return res.status(403).json("User already activated");
        }
        knex("users")
          .update("activated", true)
          .where({ id: id, email: email })
          .then(() => {
            res
              .status(200)
              .json("You have successfully activated your account");
          })
          .catch(error => res.status(400).json(error));
      })
      .catch(error => res.status(400).json(error));
  }
});

module.exports = router;
