import { Order } from "../models/order.model.js";
import createError from "http-errors";
import { validateOrder} from "../middleware/validateOrder.js";
import mongoose from "mongoose";

const getAll = async(req,res, next) => {
    try {
        //#swagger.tags=['Order']
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        next(createError(500, "Something went wrong while fetching orders"));
    }
};

const getSingle = async(req, res, next) => {
    try{
        //#swagger.tags = ['Order']
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(401, "Invalid Order Id"));
        }    

    const order = await Order.findById(id);
    if (!order) {
        return next (createError(404, "Order not found"));
    }
        res.status(200).json(order);
    } catch (error){
        next(createError(500, "Something went wrong while fetching order."));
    }
};

const  createOrder = async(req,res, next)=>{
    try {
        //#swagger.tags=['Order']
        
        const newOrder = new Order (req.body);
        await newOrder.save();

        res.status(201).json(newOrder);
    } catch (error) {
        next(createError(400, error.message || "Invalid order data"));
    }
};

const updateOrder = async(req, res, next) => {
    try{
        //#swagger.tags=['Order']
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return next(createError(401, "Invalid Ordder ID"));
        }
       
        const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedOrder){
            return next(createError(404, "Order not found"));
        }
        res.status(200).json(updatedOrder);
    } catch (error){
        if (error.isJoi){
            return next(createError(400, error.details[0].message));
        }
        next(createError(500, "Something went wrong  while updating the order."));
    }
};

const deleteOrder = async(req, res, next) => {
    try{
        //#swagger.tags=['Order']
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return next(createError(400, "Invalid order ID"));
        }
        const deletedOrder = await Order.findByIdAndDelete(id);
        if (!deletedOrder){
            return next (createError(404, "Order not found."));
        }
        res.status(200).json({ message: "Order deleted Successfully."});
    } catch(error){
        next(createError(500, "Something went wrong while deleting the Order."));
    }
};

export { getAll, getSingle, createOrder, updateOrder, deleteOrder };
