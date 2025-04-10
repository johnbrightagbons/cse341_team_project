import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB Atlas");
    return conn;
  } catch {
    console.log("Failed to connect:");
  }
};
async function name() {
  const cursor = connectDB.db("ecommerce").Collection("products");
  console.log(cursor);
}
name();
