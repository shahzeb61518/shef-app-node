const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String },
  image: { type: String },
  image1: { type: String },
  image2: { type: String },
  image3: { type: String },
  image4: { type: String },
  video: { type: String },
  userId: { type: mongoose.Schema.ObjectId, ref: "Users" },
  userName: { type: String },
  userEmail: { type: String },
  userPhone: { type: String },
  type: { type: String },
  delivery: { type: String },
});
module.exports = mongoose.model("Post", postSchema);
