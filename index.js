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
const GitHubStrategy = require("passport-github").Strategy;

app.use(
  session.Cookie({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: true, // Set to true if using HTTPS
    sameSite: "strict", // CSRF protection
  })
);

//session middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL:
        "https://cse341-team-project-jmne.onrender.com/auth/github/callback",
    },
    function (accessToken, refreshToken, user, done) {
      return done(null, user);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.use(express.json());
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", routers);

app.listen(8080, () => {
  console.log("server started and listening at port 8080");
});
