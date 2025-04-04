/*import Joi from "@hapi/joi"

const  productValidation = Joi.object({
    name: Joi.string().required().uppercase(), 
    description: Joi.string().required(), 
    image: Joi.string().uri().optional(),
    price: Joi.number().min(0).required(),
})

export default productValidation;