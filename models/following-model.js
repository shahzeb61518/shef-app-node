const mongoose = require('mongoose');

const followingSchema = mongoose.Schema({
    followingId: { type: String, required: true },
    followingName: { type: String, required: true },
    followerId: { type: String, required: true },
    // followerId: { type: mongoose.Schema.ObjectId, ref: 'Company' },
});
module.exports = mongoose.model('Following', followingSchema);
