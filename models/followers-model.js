const mongoose = require("mongoose");
// var uniqueValidator = require('mongoose-unique-validator');

const followersSchema = mongoose.Schema({
  followerId: { type: String, required: true },
  followerName: { type: String, required: true },
  followerImage: { type: String },
  followingId: { type: String, required: true },
  followingName: { type: String, required: true },
  followingImage: { type: String },
  read: { type: Boolean, default: false },
  // followingId: { type: mongoose.Schema.ObjectId, ref: 'Company' },
});

// followersSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Followers", followersSchema);
