const mongoose = require("mongoose");

const contributorSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    required: true,
  },
  contributions: {
    type: Array,
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Contributor", contributorSchema);
