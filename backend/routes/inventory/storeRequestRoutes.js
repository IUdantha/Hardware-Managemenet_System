const express = require('express');
const router = express.Router();
const storeRequestController = require('../../controllers/inventory/storeRequestController');

// Read all store Requests
router.get("/", storeRequestController.getStoreRequest);

// Create store Requests
router.post("/", storeRequestController.setStoreRequest);

module.exports = router
