<<<<<<< HEAD
const router = require('express').Router();  
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/xxx',  require('./xxx'));  
router.use('/xxxx', require('./xxxx'));


router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }        
            res.redirect('/');
        });
    });

module.exports = router;
=======
import express from "express";
import swagger  from "./swagger.js"

import userRouter from "./user.js"
import productRouter from "./product.js"

const routes = express.Router();

routes.use('/', swagger);
routes.use('/user', userRouter);
routes.use('/product', productRouter);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'http://localhost:5002/api/product/',
    };
    res.send(docData);
  })
);

module.exports = routes;
>>>>>>> 4e04c6c (Removed node_modules from repository)
