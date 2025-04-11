import express from "express";
import passport from "passport";

import swagger from "./swagger.js";
import userRouter from "./user.js";
import productRouter from "./products.js";
import paymentRouter from "./payment.js";
import orderRouter from "./order.js";
import loginRoutes from "./login.js";

const routes = express.Router();

// Manual login
routes.use("/auth", loginRoutes);

// GitHub OAuth login
routes.get("/login", passport.authenticate("github"));
routes.get("/github/callback", passport.authenticate("github", {
  successRedirect: "/",
  failureRedirect: "/login"
}));

routes.get("/logout", (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect("/");
  });
});

// Swagger
routes.use("/swagger", swagger);

// Protected routes
routes.use("/user", userRouter);
routes.use("/product", productRouter);
routes.use("/order", orderRouter);
routes.use("/payment", paymentRouter);

// Default
routes.get("/", (req, res) => {
  res.send({ documentationURL: "http://localhost:5002/api-docs" });
});

export default routes;
