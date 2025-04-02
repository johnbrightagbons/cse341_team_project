import { User } from "../models/user.model.js"
import createError from "http-errors"
import validatedUser from "../middleware/validateUser.js"


const  createUser = async(req,res, next)=>{
    try {
      const user = await validatedUser.validateAsync(req.body)
    } catch (error) {
        
    }
}