const Payment = require("../models/Payment");
const { validationResult } = require("express-validator");

class PaymentController {
  
  static index = async (req, res) => {

    try {
      const Payments = await Payment.find();
      return res.status(200).json(Payments);
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  };

  static show = async (req, res) => {
    try {
      Payment.findById(req.params.id)
        .then((Payment) => {
          return res.status(200).json(Payment);
        })
        .catch(() => {
          return res.status(404).json("Payment not found");
        });
    } catch {
      return res.status(500).json("Server Error");
    }
  };

  static create = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    try {
      await Payment.insertOne(req.body);
      return res.status(200).json("Payment created successfully");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static update = async (req, res) => {

    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    try {
      await Payment.findById(req.params.id)
        .then(async () => {
          await Payment.findByIdAndUpdate(req.params.id, req.body);
          return res.status(200).json("Payment updated successfully");
        })
        .catch(() => {
          return res.status(404).json("Payment not found");
        });
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  };

  static destroy = async (req, res) => {
    try {
      const checkId = await Payment.findById(req.params.id)
        .then(async () => {
          await Payment.findByIdAndDelete(req.params.id);
          return res.status(200).json("Payment deleted successfully");
        })
        .catch(() => {
          return res.status(404).json("Payment not found");
        });
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  };
}
module.exports = PaymentController;
