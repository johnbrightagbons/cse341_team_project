import { Router } from "express";
import UserController from "../controllers/userController";
import OrderController from "../controllers/orderController";
import PaymentController from "../controllers/paymentController";
import ProductController from "../controllers/productController";

// CREATE
Router.post("/users", UserController.create);
Router.post("/orders", OrderController.create);
Router.post("/payments", PaymentController.create);
Router.post("/products", ProductController.create);

// READ Many
Router.get("/users", UserController.index);
Router.get("/orders", OrderController.index);
Router.get("/payments", PaymentController.index);
Router.get("/products", ProductController.index);

// READ ONE BY ID
Router.get("/users/{:id}", UserController.show);
Router.get("/orders/{:id}", OrderController.show);
Router.get("/payments/{:id}", PaymentController.show);
Router.get("/products/{:id}", ProductController.show);

// UPDATE
Router.put("/users/{:id}", UserController.update);
Router.put("/orders/{:id}", OrderController.update);
Router.put("/payments/{:id}", PaymentController.update);
Router.put("/products/{:id}", ProductController.update);

// DELETE
Router.delete("/users/{:id}", UserController.destroy);
Router.delete("/orders/{:id}", OrderController.destroy);
Router.delete("/payments/{:id}", PaymentController.destroy);
Router.delete("/products/{:id}", ProductController.destroy);

module.exports = Router;
