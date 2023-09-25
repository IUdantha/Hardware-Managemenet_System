const express = require('express');
const router = express.Router();
const SupplierRequestController = require("../../controllers/inventory/supplierRequestController");

// Create Supplier Request
router.post("/", SupplierRequestController.setSupplierRequest);

// Read all Supplier Requests
router.get("/", SupplierRequestController.getSupplierRequest);

// Delete Supplier Request
router.delete("/:supplierRequestid", SupplierRequestController.deleteSupplierRequest);


module.exports = router