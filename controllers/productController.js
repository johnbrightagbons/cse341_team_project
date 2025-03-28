import { Product } from "../models/product.model.js"
import createError from "http-errors"
import validatedProduct from "../utils/validateProduc.js"


const  createProduct = async(req,res, next)=>{
    try {
      const product = await validatedProduct.validateAsync(req.body)
    } catch (error) {
        
    }
}

