const passport = require("passport");
const routes = require("express").Router();
const UserController = require("../controllers/userController");
const OrderController = require("../controllers/orderController");
const PaymentController = require("../controllers/paymentController");
const ProductController = require("../controllers/productController");

// Auth Middleware this will impliment protection on the route
const isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

// AUTHENTICATION
routes.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["profile"] })
);
routes.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    // start a session and save the user profile to the session
    req.session.user = req.user;
    console.log("User logged in successfully");
    res.redirect("/dashboard");
  }
);
routes.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    // Clear the session data
    req.session = null; // Clear the session data
    console.log("User logged out successfully");
  });
  res.redirect("/login");
});

routes.get("/", (req, res) => {
  res.redirect("/dashboard");
});

routes.get("/dashboard", (req, res) => {
  if (req.user == undefined) {
    return res.redirect("/login");
  }

  res.sendFile(__dirname + "/views/dashboard.html");
});

routes.get("/login", (req, res) => {
  if (req.user) {
    return res.redirect("/dashboard");
  }
  res.sendFile(__dirname + "/views/login.html");
});

// CREATE
routes.post("/users", UserController.create);
routes.post("/orders", OrderController.create);
routes.post("/payments", PaymentController.create);
routes.post("/products", ProductController.create);

// READ Many
routes.get("/users", UserController.index);
routes.get("/orders", OrderController.index);
routes.get("/payments", PaymentController.index);
routes.get("/products", ProductController.index);

// READ ONE
routes.get("/users/{:id}", UserController.show);
routes.get("/orders/{:id}", OrderController.show);
routes.get("/payments/{:id}", PaymentController.show);
routes.get("/products/{:id}", ProductController.show);

// UPDATE
routes.put("/users/{:id}", UserController.update);
routes.put("/orders/{:id}", OrderController.update);
routes.put("/payments/{:id}", PaymentController.update);
routes.put("/products/{:id}", ProductController.update);

// DELETE
routes.delete("/users/{:id}", UserController.destroy);
routes.delete("/orders/{:id}", OrderController.destroy);
routes.delete("/payments/{:id}", PaymentController.destroy);
routes.delete("/products/{:id}", ProductController.destroy);

module.exports = routes;
