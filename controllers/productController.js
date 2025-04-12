import { Product } from "../models/product.model.js";
import createError from "http-errors";
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
            return next(createError(400, "Invalid Product Id"));
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

const createProduct = async (req, res, next) => {
    try {
        // #swagger.tags = ['Product']

        // Validate product fields
        const products = await validateProduct.validateAsync(req.body);

        // Check for image file
        if (!req.file) {
            return next(createError(400, "Product image is required."));
        }

        const imageUrl = req.file.path; 

        const newProduct = new Product({
            name: products.name,
            description: products.description,
            image: imageUrl,
            price: products.price
        });

        await newProduct.save();
        res.status(201).json(newProduct);

    } catch (error) {
        next(createError(400, error.details?.[0]?.message || error.message || "Invalid product data"));
    }
};


const updateProduct = async (req, res, next) => {
    try {
      //#swagger.tags=['Product']
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(createError(400, "Invalid product ID"));
      }
  
      const updateData = { ...req.body };
  
      // check immage file
      if (req.file) {
        updateData.image = req.file.path;
      }
  
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
  
      if (!updatedProduct) {
        return next(createError(404, "Product not found"));
      }
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      if (error.isJoi) {
        return next(createError(400, error.details[0].message));
      }
      next(createError(500, "Something went wrong while updating the product."));
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
