import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Failed to connect:", error);
  }
};
