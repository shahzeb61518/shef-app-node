const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  title: { type: String, required: true },
  description: { type: String, required: true },
  video: { type: String },
  userId: { type: String, required: true },
  userName: { type: String },
});
module.exports = mongoose.model("Videos", videoSchema);
