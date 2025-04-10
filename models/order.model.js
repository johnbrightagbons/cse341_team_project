import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",  
            required: true 
        },
        productId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Product",
            required: true 
        },
        description: { 
            type: Array, 
            required: true, 
            trim: true 
        },
        image: { 
            type: String},
        price: { 
            type: Number, 
            required: true, 
            min: 0  
        },
        status: { 
            type: String, 
            enum: ["pending", "processing", "shipped", "delivered", "cancelled"], 
            default: "pending" 
        }
    }, 
    { 
        timestamps: true 
    }
);
export const Order = mongoose.model("Order", orderSchema);
