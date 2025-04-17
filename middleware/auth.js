const { body } = require("express-validator");

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // User is not authenticated
  res.status(401).json({ message: "Unauthorized" });
};

const validateUser = [
  body("fullname").notEmpty().withMessage("Fullname is required"),
  body("email").notEmpty().withMessage("Password is required").isEmail().withMessage("Please use a Valid email"),
  body("password")
    .notEmpty().withMessage("password is required")
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
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price can not be zero or less"),
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
    .withMessage("Amount is Required")
    .isFloat({ min: 0 })
    .withMessage("Amount can not be zero or less"),
  body("status").notEmpty().withMessage("Status is required"),
];
const validateOrder = [
  body("userId").notEmpty().isMongoId().withMessage("User Id is required"),
  body("productId")
    .notEmpty()
    .isMongoId()
    .withMessage("Product Id is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("image")
    .notEmpty()
    .withMessage("Image Url is required")
    .isURL()
    .withMessage("Image Url is not valid"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price can not be zero or less"),
  body("status").notEmpty().withMessage("Status is required"),
];
const validateUpdate = [
  body("fullname").optional().notEmpty().withMessage("Fullname is required"),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("Email should not be Empty")
    .normalizeEmail()
    .isEmail()
    .withMessage("Email not valid"),
  body("password")
    .optional()
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage("Password required with at least 8 characters"),
  body("role")
    .optional()
    .notEmpty()
    .withMessage("Role should be admin or client"),

  body("name").optional().notEmpty().withMessage("Product name not valid"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description not valid"),
  body("image")
    .optional()
    .notEmpty()
    .isURL()
    .withMessage("Image Url is not valid"),

  body("orderId")
    .optional()
    .notEmpty()
    .isMongoId()
    .withMessage("Order Id is not valid"),
  body("transactionId")
    .isMongoId()
    .optional()
    .notEmpty()
    .withMessage("Transaction Id is not valid"),
  body("amount")
    .optional()
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Amount can not be zero or less"),
  body("status").optional().notEmpty().withMessage("Status is not valid"),

  body("userId")
    .optional()
    .notEmpty()
    .isMongoId()
    .withMessage("User Id is not valid"),
  body("productId")
    .optional()
    .notEmpty()
    .isMongoId()
    .withMessage("Product Id is not valid"),
  body("price")
    .optional()
    .notEmpty()
    .isFloat({ min: 0 })
    .withMessage("Price cannot be zero or less"),
];

module.exports = {
  isAuth,
  validateUser,
  validateProduct,
  validatePayment,
  validateOrder,
  validateUpdate,
};
