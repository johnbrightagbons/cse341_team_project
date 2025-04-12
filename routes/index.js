const passport = require("passport");
const routes = require("express").Router();
const UserController = require("../controllers/userController");
const OrderController = require("../controllers/orderController");
const PaymentController = require("../controllers/paymentController");
const ProductController = require("../controllers/productController");

// AUTHENTICATION

routes.get("/logout", (req, res) => {
  //user logout from passport github

})

routes.get("/dashboard", (req, res) => {
  if (!req.user) {
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
