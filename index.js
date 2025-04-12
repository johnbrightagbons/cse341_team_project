require("dotenv").config();
const express = require("express");
const routers = require("./routes/index.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("swagger-jsdoc");
const options = require("./swagger.json");
const specs = swaggerDoc(options);
const app = express();
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;

// store a session here
app.use(
  session({
    secret: "cse341-team-project",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: true, maxAge: 60 * 60 * 1000 },
  })
);

//session middleware
app.use(passport.initialize());

passport.serializeUser(function (user, done) {
  done(null, user)
});
passport.deserializeUser(function (id, done) {
  done(null, user);
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        "https://cse341-team-project-jmne.onrender.com/auth/github/callback",
    },
    function (accessToken, refreshToken, user, done) {
      // Save the user profile to the session or database
      return done(null, user);
    }
  )
);

app.use(express.json());
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", routers);

app.listen(8080, () => {
  console.log("server started and listening at port 8080");
});
