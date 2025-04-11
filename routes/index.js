import express from "express";
import passport from "passport";

import swagger from "./swagger.js";
import userRouter from "./user.js";
import productRouter from "./product.js";

const routes = express.Router();

// GitHub OAuth login
routes.get('/login', passport.authenticate('github'));

// GitHub OAuth callback
routes.get('/github/callback', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

// Logout
routes.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// basic documents
routes.get('/', (req, res) => {
  res.send({
    documentationURL: 'http://localhost:5002/api-docs'
  });
});

// Routes
routes.use('/swagger', swagger);
routes.use('/user', userRouter);
routes.use('/product', productRouter);

export default routes;
