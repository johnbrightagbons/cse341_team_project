import { Order } from "../models/order.model.js";
import createError from "http-errors";
import { validateOrder } from "../utils/validateOrder.js";
import { Product } from "../models/product.model.js";
import mongoose from "mongoose";

// Get all orders
const getAll = async (req, res, next) => {
    try {
        //#swagger.tags = ['Order']
        const orders = await Order.find()
            .populate("userId", "name email")  // Populate user data (e.g., name, email)
            .populate("productId", "name price image");  // Populate product data (e.g., name, price, image)
        
        res.status(200).json(orders);
    } catch (error) {
        next(createError(500, "Something went wrong while fetching orders"));
    }
};

// Get a single order by ID
const getSingle = async (req, res, next) => {
    try {
        //#swagger.tags = ['Order']
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(400, "Invalid Order Id"));
        }

        // Fetch order and populate related data
        const order = await Order.findById(id)
            .populate("userId", "name email")
            .populate("productId", "name price image");

        if (!order) {
            return next(createError(404, "Order not found"));
        }

        res.status(200).json(order);
    } catch (error) {
        next(createError(500, "Something went wrong while fetching the order."));
    }
};

// Create a new order
const createOrder = async (req, res, next) => {
    const userId = req.user?.id;  // Assuming the user is authenticated and their ID is in req.user
    const productId = req.body.productId; // Get productId from request body

    try {
        // #swagger.tags = ['Order']

        // Validate the order data
        const orders = await validateOrder.validateAsync(req.body);
        if (!orders || !productId) {
            return next(createError(400, "All fields are required."));
        }

        // Fetch the product using the productId to get the associated image
        const product = await Product.findById(productId);
        if (!product) {
            return next(createError(404, "Product not found."));
        }

        // Create a new order with the product's image
        const newOrder = new Order({
            userId,
            productId,
            description: orders.description,
            price: orders.price, // Ensure price is included if it's part of the order
            image: product.image  // Get the image from the associated product
        });

        // Save the order to the database
        await newOrder.save();

        // Respond with the created order
        res.status(201).json(newOrder);

    } catch (error) {
        next(createError(400, error.message || "Invalid order data"));
    }
};

// Update an existing order
const updateOrder = async (req, res, next) => {
    try {
        //#swagger.tags = ['Order']
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(400, "Invalid Order ID"));
        }

        // Find and update the order
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedOrder) {
            return next(createError(404, "Order not found"));
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        if (error.isJoi) {
            return next(createError(400, error.details[0].message));
        }
        next(createError(500, "Something went wrong while updating the order."));
    }
};

// Delete an order
const deleteOrder = async (req, res, next) => {
    try {
        //#swagger.tags = ['Order']
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(400, "Invalid order ID"));
        }

        // Find and delete the order
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder) {
            return next(createError(404, "Order not found."));
        }

        res.status(200).json({ message: "Order deleted successfully." });
    } catch (error) {
        next(createError(500, "Something went wrong while deleting the Order."));
    }
};

export { getAll, getSingle, createOrder, updateOrder, deleteOrder };
