import Joi from "joi";
import mongoose from "mongoose";

export const orderSchema = Joi.object({
    userId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message("Invalid user ID");
            }
            return value;
        })
        .required(),
    
    productId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message("Invalid product ID");
            }
            return value;
        })
        .required(),

    description: Joi.string().trim().required(),
    image: Joi.string().uri().optional(), 
    price: Joi.number().min(0).required(), 
    status: Joi.string().valid("pending", "processing", "shipped", "delivered", "cancelled").optional(),
});

const validateOrder = async (req, res, next) => {
    try {
        await orderSchema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.details.map(err => err.message)
        });
    }
};

export { validateOrder };
