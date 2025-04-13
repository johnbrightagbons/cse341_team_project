import { Payment } from "../models/payment.model.js";
import createError from "http-errors";
import { paymentSchema } from "../utils/validatePayment.js";  
import mongoose from "mongoose";

// Get all payments
const getAll = async (req, res, next) => {
    try {
        //#swagger.tags = ['Payment']
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        next(createError(500, "Something went wrong while fetching payments"));
    }
};

// Get a single payment by ID
const getSingle = async (req, res, next) => {
    try {
        //#swagger.tags = ['Payment']
        const { id } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(400, "Invalid Payment Id"));
        }

        // Fetch payment from DB
        const payment = await Payment.findById(id);
        if (!payment) {
            return next(createError(404, "Payment not found"));
        }

        res.status(200).json(payment);
    } catch (error) {
        next(createError(500, "Something went wrong while fetching payment."));
    }
};

// Create a new payment
const createPayment = async (req, res, next) => {
    const userId = req.user?.id; // Assuming user ID is available in req.user from authentication
    const orderId = req.body.orderId; // Extract orderId from the request body
    try {
        //#swagger.tags = ['Payment']

        // Validate the incoming payment data using Joi
        const payments = await paymentSchema.validateAsync(req.body);
        if (!payments) {
            return next(createError(400, "All fields are required."));
        }

        // Create a new payment record using validated data
        const newPayment = new Payment({
            userId,
            orderId,
            amount: payments.amount,
            paymentMethod: payments.paymentMethod,
            transactionId: payments.transactionId,
            status: payments.status,
        });

        // Save the new payment to the database
        await newPayment.save();

        // Respond with the created payment object
        res.status(201).json(newPayment);
    } catch (error) {
        // Handle validation errors from Joi
        if (error.isJoi) {
            return next(createError(400, error.details[0].message)); // If Joi validation fails
        }

        // Generic error handling
        next(createError(400, error.message || "Invalid payment data"));
    }
};

// Update an existing payment
const updatePayment = async (req, res, next) => {
    try {
        //#swagger.tags = ['Payment']
        const { id } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(400, "Invalid Payment ID"));
        }
      
        // Find the payment by ID and update it
        const updatedPayment = await Payment.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true, // Ensures that validation is triggered on the updated fields
        });

        if (!updatedPayment) {
            return next(createError(404, "Payment not found"));
        }

        // Respond with the updated payment object
        res.status(200).json(updatedPayment);
    } catch (error) {
        // Handle validation errors from Joi
        if (error.isJoi) {
            return next(createError(400, error.details[0].message)); // If Joi validation fails
        }

        // Generic error handling
        next(createError(500, "Something went wrong while updating the payment."));
    }
};

// Delete a payment
const deletePayment = async (req, res, next) => {
    try {
        //#swagger.tags = ['Payment']
        const { id } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(400, "Invalid payment ID"));
        }

        // Find and delete the payment by ID
        const deletedPayment = await Payment.findByIdAndDelete(id);
        if (!deletedPayment) {
            return next(createError(404, "Payment not found."));
        }

        // Respond with a success message
        res.status(200).json({ message: "Payment deleted successfully." });
    } catch (error) {
        next(createError(500, "Something went wrong while deleting the payment."));
    }
};

export { getAll, getSingle, createPayment, updatePayment, deletePayment };
