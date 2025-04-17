const Product = require("../models/Product");
const { validationResult } = require("express-validator");

class ProductController {
  
  static index = async (req, res) => {
    try {
      const Products = await Product.find();
      return res.status(200).json(Products);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static show = async (req, res) => {
    try {
      Product.findById(req.params.id)
        .then((Product) => {
          return res.status(200).json(Product);
        })
        .catch(() => {
          return res.status(404).json("Product not found");
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
      await Product.insertOne(req.body);
      return res.status(200).json("Product created successfully");
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
      await Product.findById(req.params.id)
        .then(async () => {
          await Product.findByIdAndUpdate(req.params.id, req.body);
          return res.status(200).json("Product updated successfully");
        })
        .catch(() => {
          return res.status(404).json("Product not found");
        });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };

  static destroy = async (req, res) => {
    try {
      const checkId = await Product.findById(req.params.id)
        .then(async () => {
          await Product.findByIdAndDelete(req.params.id);
          return res.status(200).json("Product deleted successfully");
        })
        .catch(() => {
          return res.status(404).json("Product not found");
        });
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  };
}
module.exports = ProductController;
