import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    // to make our app easy to use and personalized lets replace username with fullname
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    passwrod: { type: String, required: true },
    role: {
      type: String,
      enum: ["client", "admin"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
