require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routers = require("./routes/index.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");
const options = require("./swagger.json");
const specs = swaggerDoc(options);
const app = express();
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github").Strategy;
const bodyParser = require("body-parser");

// ✅ Mongoose Connection Block
mongoose.connect(process.env.MONGO_URI);

app.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});
passport.deserializeUser(function (id, cb) {
  cb(null, id);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

app.use(bodyParser.json());
app.use(express.json());

app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", routers);

app.listen(8080, () => {
  console.log("server started and listening at port 8080");
});

module.exports = app;
