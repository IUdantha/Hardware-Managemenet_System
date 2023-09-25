const express = require("express");
const { check } = require("express-validator");

const feedbackController = require("../../controllers/customer/feedbackController");

const router = express.Router();

//create feedbackrequest
router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("email").not().isEmpty(),
    check("type").not().isEmpty(),
    check("contact").not().isEmpty(),
    check("date").not().isEmpty(),
    check("know"),
    check("help"),
    check("reccomend"),
    check("easy"),
    check("happy"),
  ],
  feedbackController.createFeedback
);

//delete payment request
//router.delete("/:feedid", paymentController.deletePayment);

//read payment request
//router.get("/:payid", paymentController.getPaymentById);

//read all feedbacks
router.get("/", feedbackController.getAllFeedbacks);

//update payment request
/*router.patch(
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
*/
module.exports = router;
