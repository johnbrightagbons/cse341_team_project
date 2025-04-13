const { body, validationResult } = require("express-validator");

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // User is not authenticated
  res.status(401).json({ message: "Unauthorized" });
};

const validateUser = [
  body("fullname").notEmpty().withMessage("Fullname is required"),
  body("email").notEmpty().isEmail().withMessage("Password is required"),
  body("password")
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password required with at least 8 characters"),
  body("role").notEmpty().withMessage("Role is required"),
];
const validateProduct = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("image").notEmpty().isURL().withMessage("Image Url is required"),
  body("price")
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Price is required and valid Numeric"),
];
const validatePayment = [
  body("orderId").notEmpty().isMongoId().withMessage("Order Id is required"),
  body("transactionId")
    .isMongoId()
    .notEmpty()
    .withMessage("Transaction Id is required"),
  body("userId").notEmpty().isMongoId().withMessage("User Id is required"),
  body("amount")
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Amount is required and valid Numeric"),
  body("status").notEmpty().withMessage("Status is required"),
];
const validateOrder = [
  body("userId").notEmpty().isMongoId().withMessage("User Id is required"),
  body("productId")
    .notEmpty()
    .isMongoId()
    .withMessage("Product Id is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("image").notEmpty().isURL().withMessage("Image Url is required"),
  body("price")
    //min value 0 no negative prices

    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Price is required and valid Numeric"),
  body("status").notEmpty().withMessage("Status is required"),
];
const validateUserUpdate = [
  body("fullname").withMessage("Fullname not Valid"),
  body("email").isEmail().withMessage("Password not Valid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password required with at least 8 characters"),
  body("role").withMessage("Role not valid"),
];
const validateProductUpdate = [
  body("name").withMessage("Product name not Valid"),
  body("description").withMessage("Description not Valid"),
  body("image").isURL().withMessage("Image Url not Valid"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price not Valid and valid Numeric"),
];
const validatePaymentUpdate = [
  body("orderId").isMongoId().withMessage("Order Id not Valid"),
  body("transactionId").isMongoId().withMessage("Transaction Id not Valid"),
  body("userId").isMongoId().withMessage("User Id not Valid"),
  body("amount").isFloat({ min: 0 }).withMessage("Amount not Valid"),
  body("status").withMessage("Status not Valid"),
];
const validateOrderUpdate = [
  body("userId").isMongoId().withMessage("User Id not Valid"),
  body("productId").isMongoId().withMessage("Product Id not Valid"),
  body("description").withMessage("Description not Valid"),
  body("image").isURL().withMessage("Image Url not Valid"),
  body("price").isFloat({ min: 0 }).withMessage("Price not Valid"),
  body("status").withMessage("Status not Valid"),
];

module.exports = {
  isAuth,
  validateUser,
  validateProduct,
  validatePayment,
  validateOrder,
  validateUserUpdate,
  validateProductUpdate,
  validatePaymentUpdate,
  validateOrderUpdate,
};
