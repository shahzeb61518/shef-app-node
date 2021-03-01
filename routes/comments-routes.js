const express = require("express");
const router = express.Router();
const Controller = require("../controllers/comments-controller");
const checkAuth = require("./../middleware/check-auth");

// Create
router.post("/create", Controller.create);

// get
router.post("/get", Controller.get);

// get by blog id
router.post("/get-by-post-id", Controller.getByPostId);

// update
router.post("/update", Controller.update);

// delete
router.post("/delete", Controller.delete);

module.exports = router;
