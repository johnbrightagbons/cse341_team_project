const Order = require("../models/Order");
const { validationResult } = require("express-validator");

class OrderController {
  static index = async (req, res) => {
    try {
      const orders = await Order.find();
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  };

  static show = async (req, res) => {
    try {
      Order.findById(req.params.id)
        .then((order) => {
          return res.status(200).json(order);
        })
        .catch(() => {
          return res.status(404).json("Order not found");
        });
    } catch {
      return res.status(500).json("Server Error");
    }
  };

  static create = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await Order.insertOne(req.body);
      return res.status(200).json("Order created successfully");
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static update = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await Order.findById(req.params.id)
        .then(async () => {
          await Order.findByIdAndUpdate(req.params.id, req.body);
          return res.status(200).json("Order updated successfully");
        })
        .catch(() => {
          return res.status(404).json("Order not found");
        });
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  };

  static destroy = async (req, res) => {
    try {
      const checkId = await Order.findById(req.params.id)
        .then(async () => {
          await Order.findByIdAndDelete(req.params.id);
          return res.status(200).json("Order deleted successfully");
        })
        .catch(() => {
          return res.status(404).json("Order not found");
        });
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  };
}
module.exports = OrderController;
