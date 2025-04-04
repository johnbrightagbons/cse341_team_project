/*import Joi from "@hapi/joi"

const  userValidation = Joi.object({
    username: Joi.string().required(), 
    email: Joi.string().required(), 
    password: Joi.string().uri().optional(),    
})

export default userValidation;