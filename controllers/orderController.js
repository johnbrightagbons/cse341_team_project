import { Order } from "../models/order.model.js"
import createError from "http-errors"
import validatedOrder from "../middleware/validateOrder.js"


const  createOrder = async(req,res, next)=>{
    try {
      const order = await validatedOrder.validateAsync(req.body)
    } catch (error) {
        
    }
}