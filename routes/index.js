const passport = require("passport");
const {
  validateOrder,
  validatePayment,
  validateProduct,
  validateUser,
  validateUpdate,
} = require("../middleware/auth");
const routes = require("express").Router();
const UserController = require("../controllers/userController");
const OrderController = require("../controllers/orderController");
const PaymentController = require("../controllers/paymentController");
const ProductController = require("../controllers/productController");
const ContributorController = require("../controllers/contributorController");
const isAuth = require("../middleware/auth").isAuth;

// login
routes.get("/login", passport.authenticate("github"));

//logout
routes.get("/logout", (req, res) => {
  req.logOut(() => {
    res.redirect("/login");
  });
});

routes.get(
  "/auth/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/api-docs");
  }
);

routes.get("/dashboard", isAuth, (req, res) => {
  return res.sendFile(__dirname + "/views/dashboard.html");
});

// CREATE
routes.post("/users", validateUser, UserController.create);
routes.post("/orders", validateOrder, OrderController.create);
routes.post("/payments", validatePayment, PaymentController.create);
routes.post("/products", validateProduct, ProductController.create);

// READ Many
routes.get("/", ContributorController.index);
routes.get("/users", UserController.index);
routes.get("/orders", OrderController.index);
routes.get("/payments", PaymentController.index);
routes.get("/products", isAuth, ProductController.index);

// READ ONE
routes.get("/users/:id", UserController.show);
routes.get("/orders/:id", OrderController.show);
routes.get("/payments/:id", PaymentController.show);
routes.get("/products/:id", isAuth, ProductController.show);

// UPDATE
routes.put("/users/:id", validateUpdate, UserController.update);
routes.put("/orders/:id", validateUpdate, OrderController.update);
routes.put("/payments/:id", validateUpdate, PaymentController.update);
routes.put("/products/:id", validateUpdate, ProductController.update);

// DELETE
routes.delete("/users/:id", UserController.destroy);
routes.delete("/orders/:id", OrderController.destroy);
routes.delete("/payments/:id", PaymentController.destroy);
routes.delete("/products/:id", ProductController.destroy);

module.exports = routes;
