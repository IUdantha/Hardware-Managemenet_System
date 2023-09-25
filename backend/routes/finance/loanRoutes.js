const express = require("express");
const { check } = require("express-validator");

const loanController = require("../../controllers/finance/loan-contoller");

const router = express.Router();

//create loan request
router.post(
  "/",
  [
    check("loanNum").not().isEmpty(),
    check("loanType").not().isEmpty(),
    check("amount").not().isEmpty(),
    check("interest").not().isEmpty(),
    check("period").not().isEmpty(),
    check("monthPayment").not().isEmpty(),
    // check("note"),
  ],
  loanController.createLoan
);

//delete loan request
router.delete("/:loanid", loanController.deleteLoan);

//read loan request
router.get("/:loanid", loanController.getLoanById);

//read all loans
router.get("/", loanController.getAllLoans);

//update loan request
router.patch(
  "/:loanid",
  [
    check("loanNum").not().isEmpty(),
    check("loanType").not().isEmpty(),
    check("amount").not().isEmpty(),
    check("interest").not().isEmpty(),
    check("period").not().isEmpty(),
    check("monthPayment").not().isEmpty(),
    // check("note"),
  ],
  loanController.updateLoan
);

module.exports = router;
