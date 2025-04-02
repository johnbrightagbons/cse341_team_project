import mongoose from "mongoose";

const productSchema = new  mongoose.Schema({
    name:{type: String, required:true},
    description: {type:String, required:true},
    image:{type:String},
    price:{type:Number, required:true}
},{timestamps:true})

export const  Product = mongoose.model("Product",productSchema)