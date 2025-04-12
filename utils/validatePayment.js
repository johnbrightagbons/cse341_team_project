import Joi from "joi";
import mongoose from "mongoose";


const paymentSchema = Joi.object({
    orderId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message("Invalid order ID");
            }
            return value;
        })
        .required(),

    userId: Joi.string()
        .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                return helpers.message("Invalid user ID");
            }
            return value;
        })
        .required(),

    amount: Joi.number().min(0).required(),

    paymentMethod: Joi.string()
        .valid("credit_card", "paypal", "bank_transfer", "mobile_money")
        .required(),

    transactionId: Joi.string().trim().required(),

    status: Joi.string()
        .valid("pending", "completed", "failed", "refunded")
        .optional(), 
});


const validatePayment = async (req, res, next) => {
    try {
        await paymentSchema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: error.details.map(err => err.message) });
    }
};

export { validatePayment , paymentSchema };
