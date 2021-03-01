const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  comment: { type: String, required: true },
  commentPostId: { type: String, required: true },
  commentUserId: { type: String, required: true },
  commentUserName: { type: String, required: true },
  // followingId: { type: mongoose.Schema.ObjectId, ref: 'Company' },
});
module.exports = mongoose.model("Comments", commentsSchema);
