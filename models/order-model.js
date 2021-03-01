const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  // product: { type: String, required: true },
  // quantity: { type: String, required: true },
  // price: { type: String, required: true },
  // total: { type: String, required: true },
  // discount: { type: String, required: true },
  // shipping: { type: String, required: true },
  itemArray: [],
  userId: { type: String, required: true },
  userName: { type: String },
  email: { type: String },
  contact: { type: String },
  address: { type: String },
  status: { type: String },
  total: { type: String },
  deliverTime: { type: String },
  deliverDate: { type: String },
  pickup: { type: String, default: "Not Yet" },
  delivered_at: { type: Date },
});
module.exports = mongoose.model("Order", orderSchema);
