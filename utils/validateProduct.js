import Joi from "joi";
import createError from "http-errors";


const productSchema = Joi.object({
    name: Joi.string().min(3).max(100).required()
        .messages({ "any.required": "Product name is required." }),
    description: Joi.string().min(10).max(500).required()
        .messages({ "any.required": "Description is required." }),
    price: Joi.number().positive().precision(2).required()
        .messages({ "any.required": "Price is required.", "number.positive": "Price must be a positive value." }),
    image: Joi.string().uri().optional()
});

export const validateProduct = async (req, res, next) => {
    try {
        await  productSchema.validateAsync(req.body);
        next();  
    } catch (error) {
        next(createError(400, error.details[0].message));  
    }
}


