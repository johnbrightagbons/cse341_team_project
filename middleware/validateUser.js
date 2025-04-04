import createError from "http-errors";
import Joi from "joi";

const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("client", "admin").optional()
});

export const validateUser = async (req, res, next) => {
    try {
        await userSchema.validateAsync(req.body);
        next(); 
    } catch (error) {
        next(createError(400, error.details[0].message));
    }
};
