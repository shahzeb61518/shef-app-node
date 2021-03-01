const express = require("express");
const router = express.Router();
const Controller = require("../controllers/videos-controller");
const checkAuth = require("../middleware/check-auth");

// Create
router.post("/create", Controller.create);

// get
router.post("/get", Controller.get);

router.post("/get-by-chef-id", Controller.getByChefId);

// update
router.post("/update", Controller.update);

// delete
router.post("/delete", Controller.delete);
// router.post('/delete', checkAuth, Controller.delete);

module.exports = router;
