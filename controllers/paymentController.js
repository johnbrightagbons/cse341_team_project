import { Payment } from "../models/payment.model.js";
import createError from "http-errors";
import { validatePayment} from "../middleware/validatePayment.js";
import mongoose from "mongoose";

const getAll = async(req, res, next) => {
    try {
        //#swagger.tags=['Payment']
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (error) {
        next(createError(500, "Something went wrong while fetching payments"));
    }
};

const getSingle = async(req, res, next) => {
    try{
        //#swagger.tags = ['Payment']
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(401, "Invalid Payment Id"));
        }    

    const payment = await payment.findById(id);
    if (!payment) {
        return next (createError(404, "Payment not found"));
    }
        res.status(200).json(payment);
    } catch (error){
        next(createError(500, "Something went wrong while fetching payment."));
    }
};

const  createPayment = async(req,res, next)=>{
    try {
        //#swagger.tags=['Payment']
        const validatedData = await validatePayment.validateAsync(req.body);
        const newPayment = new Payment (validatedData);
        await newPayment.save();

        res.status(201).json(newPayment);
    } catch (error) {
        next(createError(400, error.message || "Invalid payment data"));
    }
};

const updatePayment = async(req, res, next) => {
    try{
        //#swagger.tags=['Payment']
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return next(createError(401, "Invalid Payment ID"));
        }

        const validatedData = await validatePayment.validateAsync(req.body);
        const updatePayment = await Payment.findByIdAndUpdate(id, validatedData, {
            new: true,
            runValidators: true,
        });

        if (!updatePayment){
            return next(createError(404, "Payment not found"));
        }
        res.status(200).json(updatePayment);
    } catch (error){
        if (error.isJoi){
            return next(createError(400, error.details[0].message));
        }
        next(createError(500, "Something went wrong  while updating the payment."));
    }
};

const deletePayment = async(req, res, next) => {
    try{
        //#swagger.tags=['Payment']
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return next(createError(400, "Invalid payment ID"));
        }
        const deletedPayment = await Payment.findByIdAndDelete(id);
        if (!deletedPayment){
            return next (createError(404, "Payment not found."));
        }
        res.status(200).json({ message: "Payment deleted Successfully."});
    } catch(error){
        next(createError(500, "Something went wrong while deleting the payment."));
    }
};

export { getAll, getSingle, createPayment, updatePayment, deletePayment };