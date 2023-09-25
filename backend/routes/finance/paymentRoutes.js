const express = require("express");
const { check } = require("express-validator");

const paymentController = require("../../controllers/finance/payment-controller");

const router = express.Router();

//create payment request
router.post(
  "/",
  [
    check("recNub").not().isEmpty(),
    check("description").not().isEmpty(),
    check("type").not().isEmpty(),
    check("date").not().isEmpty(),
    check("amount").not().isEmpty(),
    check("note"),
  ],
  paymentController.createPayment
);

//delete payment request
router.delete("/:payid", paymentController.deletePayment);

//read payment request
router.get("/:payid", paymentController.getPaymentById);

//read all payments
router.get("/", paymentController.getAllPayments);


//update payment request
router.patch(
  "/:payid",
  [
    check("recNub").not().isEmpty(),
    check("description").not().isEmpty(),
    check("type").not().isEmpty(),
    check("date").not().isEmpty(),
    check("amount").not().isEmpty(),
    check("note"),
  ],
  paymentController.updatePayment
);

module.exports = router;
