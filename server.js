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

// ✅ Mongoose Connection Block
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Mongoose connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Mongoose connection error:", err.message);
  });

app.use(
  session({
    secret: process.env.GITHUB_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
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
      if (!profile) {
        console.log("❌ GitHub authentication failed");
        return cb("Error: No profile returned");
      }
      console.log("✅ GitHub authentication successful", profile);

      return cb(null, profile);
    }
  )
);

app.use(express.json());
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", routers);

app.listen(8080, () => {
  console.log("server started and listening at port 8080");
});
