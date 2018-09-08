const express = require("express");
const app = express();
const morgan = require("morgan");
const compression = require("compression");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");

//API ROUTES
const signup = require("./routes/api/signup");
const login = require("./routes/api/login");
const user = require("./routes/api/user");

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use("/api/signup", signup);
app.use("/api/login", login);
app.use("/api/user", user);

app.listen(PORT, () => console.log("Server started"));
