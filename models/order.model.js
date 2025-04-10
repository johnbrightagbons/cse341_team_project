import mongoose from "mongoose";

// Define the order schema
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
            type: String, 
            required: true, 
            trim: true 
        },
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

// Export the Order model
export const Order = mongoose.model("Order", orderSchema);
