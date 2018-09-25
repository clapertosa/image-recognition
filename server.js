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
const recognition = require("./routes/api/recognition");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(path.join(__dirname, "dist")));

if (process.env.NODE_ENV === "production") {
  app.disable("x-powered-by");
  app.use(compression());
  app.use(morgan("combined"));

  const checkForHTML = req => {
    const url = req.url.split(".");
    const extension = url[url.length - 1];

    if (["/"].indexOf(extension) > -1) {
      return true; //compress only .html files sent from server
    }

    return false;
  };

  app.use(compression({ filter: checkForHTML }));

  const encodeResToGzip = contentType => (req, res, next) => {
    req.url = req.url + ".gz";
    res.set("Content-Encoding", "gzip");
    res.set("Content-Type", contentType);

    next();
  };

  app.get("*.js", encodeResToGzip("text/javascript"));
  app.get("*.css", encodeResToGzip("text/css"));
}

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
app.use("/api/recognition", recognition);

app.listen(PORT, () => console.log("Server started"));
