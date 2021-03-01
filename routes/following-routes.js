const express = require('express');
const router = express.Router();
const Controller = require('../controllers/following-controller');

// Create 
router.post('/create', Controller.create);

// get
router.post('/get', Controller.get);

// update
router.post('/update', Controller.update);

// delete
router.post('/delete', Controller.delete);

module.exports = router;
