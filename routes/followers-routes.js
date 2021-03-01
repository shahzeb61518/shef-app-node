const express = require("express");
const router = express.Router();
const Controller = require("../controllers/followers-controller");
const checkAuth = require("./../middleware/check-auth");

// Create
router.post("/create", Controller.create);

//   get
router.post("/get", Controller.get);

//   get by followingId
router.post("/get-by-following-id", Controller.getByFollowingId);

//   get by followerId
router.post("/get-by-follower-id", Controller.getByFollowerId);

//   get by followerId
router.post("/get-chat-users", Controller.getChatUsers);

//   update
router.post("/update", Controller.update);

//   update
router.post("/update-read", Controller.updateFollowerRead);

//   delete
router.post("/delete", Controller.delete);

module.exports = router;
