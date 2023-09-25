const express = require("express");
const { check } = require("express-validator");

const leaveController = require("../../controllers/employee/leave-controller");

const router = express.Router();

//create payment request
router.post(
  "/",
  [
    check("empid").not().isEmpty(),
    check("name").not().isEmpty(),
    check("reason").not().isEmpty(),
    check("date").not().isEmpty(),
    check("time").not().isEmpty(),
    check("note"),
  ],
  leaveController.createLeave
);



//read payment request
router.get("/:leaveid", leaveController.getLeaveById);

//read all payments
router.get("/", leaveController.getAllLeaves);


module.exports = router;
