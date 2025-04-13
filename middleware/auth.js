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
const validateUpdate = [
  body("fullname").optional().notEmpty().withMessage("Fullname is required"),
  body("email")
    .optional()
    .notEmpty()
    .isEmail()
    .withMessage("Password is required"),
  body("password")
    .optional()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password required with at least 8 characters"),
  body("role").optional().notEmpty().withMessage("Role is required"),

  body("name").optional().notEmpty().withMessage("Product name is required"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description is required"),
  body("image")
    .optional()
    .notEmpty()
    .isURL()
    .withMessage("Image Url is required"),
  body("price")
    .optional()
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Price is required and valid Numeric"),

  body("orderId")
    .optional()
    .notEmpty()
    .isMongoId()
    .withMessage("Order Id is required"),
  body("transactionId")
    .isMongoId()
    .optional()
    .notEmpty()
    .withMessage("Transaction Id is required"),
  body("userId")
    .optional()
    .notEmpty()
    .isMongoId()
    .withMessage("User Id is required"),
  body("amount")
    .optional()
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Amount is required and valid Numeric"),
  body("status").optional().notEmpty().withMessage("Status is required"),

  body("userId")
    .optional()
    .notEmpty()
    .isMongoId()
    .withMessage("User Id is required"),
  body("productId")
    .optional()
    .notEmpty()
    .isMongoId()
    .withMessage("Product Id is required"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description is required"),
  body("image")
    .optional()
    .notEmpty()
    .isURL()
    .withMessage("Image Url is required"),
  body("price")
    .optional()
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Price is required and valid Numeric"),
  body("status").optional().notEmpty().withMessage("Status is required"),
];

module.exports = {
  isAuth,
  validateUser,
  validateProduct,
  validatePayment,
  validateOrder,
  validateUpdate,
};
