import { Product } from "../models/product.model.js";
import createError from "http-errors";
import { validateProduct} from "../middleware/validateProduct.js";
import mongoose from "mongoose";

const getAll = async(req,res, next) => {
    try {
        //#swagger.tags=['Product']
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        next(createError(500, "Something went wrong while fetching products"));
    }
};

const getSingle = async(req, res, next) => {
    try{
        //#swagger.tags = ['Product']
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(401, "Invalid Product Id"));
        }    

    const product = await Product.findById(id);
    if (!product) {
        return next (createError(404, "Product not found"));
    }
        res.status(200).json(product);
    } catch (error){
        next(createError(500, "Something went wrong while fetching product."));
    }
};

const  createProduct = async(req,res, next)=>{
    try {
        //#swagger.tags=['Product']
        const validatedData = await validateProduct.validateAsync(req.body);
        const newProduct = new Order (validatedData);
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        next(createError(400, error.message || "Invalid product data"));
    }
};

const updateProduct = async(req, res, next) => {
    try{
        //#swagger.tags=['Product']
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return next(createError(401, "Invalid product ID"));
        }

        const validatedData = await validateProduct.validateAsync(req.body);
        const updateProduct = await Product.findByIdAndUpdate(id, validatedData, {
            new: true,
            runValidators: true,
        });

        if (!updateProduct){
            return next(createError(404, "Product not found"));
        }
        res.status(200).json(updateProduct);
    } catch (error){
        if (error.isJoi){
            return next(createError(400, error.details[0].message));
        }
        next(createError(500, "Something went wrong  while updating the product."));
    }
};

const deleteProduct = async(req, res, next) => {
    try{
        //#swagger.tags=['Product']
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return next(createError(400, "Invalid product ID"));
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct){
            return next (createError(404, "Product not found."));
        }
        res.status(200).json({ message: "Product deleted Successfully."});
    } catch(error){
        next(createError(500, "Something went wrong while deleting the product."));
    }
};

export { getAll, getSingle, createProduct, updateProduct, deleteProduct };
