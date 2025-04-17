const User = require("../models/User");
const { validationResult } = require("express-validator");

class UserController {
  static index = async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  };

  static show = async (req, res) => {
    try {
      User.findById(req.params.id)
        .then((user) => {
          return res.status(200).json(user);
        })
        .catch(() => {
          return res.status(404).json("User not found");
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
      await User.insertOne(req.body);
      return res.status(200).json("User created successfully");
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
      await User.findById(req.params.id)
        .then(async () => {
          await User.findByIdAndUpdate(req.params.id, req.body);
          return res.status(200).json("User updated successfully");
        })
        .catch(() => {
          return res.status(404).json("User not found");
        });
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  };

  static destroy = async (req, res) => {
    try {
      const checkId = await User.findById(req.params.id)
        .then(async () => {
          await User.findByIdAndDelete(req.params.id);
          return res.status(200).json("User deleted successfully");
        })
        .catch(() => {
          return res.status(404).json("User not found");
        });
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  };
}
module.exports = UserController;
