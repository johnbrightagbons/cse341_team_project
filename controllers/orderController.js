const Order = require("../models/Order");
const { validationResult } = require("express-validator");

class OrderController {
  static index = async (req, res) => {
    try {
      const orders = await Order.find();
      return res.status(200).json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  };

  static show = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  };

  static create = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    try {
      const order = await Order.create(req.body);
      return res
        .status(201)
        .json({ message: "Order created successfully", order });
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  };

  static update = async (req, res) => {
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    //   }
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res
        .status(200)
        .json({ message: "Order updated successfully", order });
    } catch (error) {
      console.error("Error updating order:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  };

  static destroy = async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      return res.status(500).json({ message: "Server Error" });
    }
  };
}

module.exports = OrderController;
