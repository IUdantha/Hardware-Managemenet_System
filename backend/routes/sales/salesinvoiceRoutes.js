const express = require("express");
const router = express.Router();

const OffOrderController = require("../../controllers/sales/offOrderController");

//getAllInvoice
router.get("/", OffOrderController.getAllOrders);

router.patch("/:invoiceId", OffOrderController.updateInvoice);
router.get("/:invoiceId", OffOrderController.getInvoiceById);
router.delete("/:invoiceId", OffOrderController.deleteInvoice);

module.exports = router;
