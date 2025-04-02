import { Payment } from "../models/payment.model.js"
import createError from "http-errors"
import validatedPayment from "../middleware/validatePayment.js"


const  createPayment = async(req,res, next)=>{
    try {
      const payment = await validatedPayment.validateAsync(req.body)
    } catch (error) {
        
    }
}