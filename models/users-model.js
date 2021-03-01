const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  created_at: { type: Date, default: Date.now },
  userRole: { type: String },
  userPassword: { type: String, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  phone: { type: String },
  profileImage: {
    type: String,
    default:
      "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
  },
  aboutMe: { type: String, default: "none" },
  location: { type: String, default: "none" },
  creditCard: { type: Boolean, default: false },
  emailVerify: { type: Boolean, default: false },
  facebook: { type: String, default: "#" },
  twitter: { type: String, default: "#" },
  instagarm: { type: String, default: "#" },
  available: { type: Boolean },
  type: { type: String },
  zip: { type: String },
  paypalId: { type: String },
});
module.exports = mongoose.model("Users", usersSchema);
