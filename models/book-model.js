const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  title: { type: String, required: true },
  file: { type: String },
  userId: { type: String, required: true },
  userName: { type: String },
});
module.exports = mongoose.model("Books", bookSchema);
