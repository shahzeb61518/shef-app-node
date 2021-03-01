const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  fromId: { type: String, required: true },
  fromName: { type: String },
  fromImage: { type: String },
  toId: { type: String, required: true },
  toName: { type: String },
  toImage: { type: String },
  message: { type: String, required: true },
});
module.exports = mongoose.model("Chat", chatSchema);
