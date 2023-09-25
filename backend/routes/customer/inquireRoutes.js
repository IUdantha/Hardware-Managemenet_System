const express = require("express");
const { check } = require("express-validator");

const inquireController = require("../../controllers/customer/inquireController");

const router = express.Router();

//create inquire request
router.post(
  "/",
  [
    check("name").not().isEmpty(),
    check("customId").not().isEmpty(),
    check("email").not().isEmpty(),
    check("type").not().isEmpty(),
    check("address"),
  ],
  inquireController.createInquire
);

//delete inquire request
router.delete("/:inqid", inquireController.deleteInquire);

//read payment request
router.get("/:inqid", inquireController.getInquireById);

//read all Inquires
router.get("/", inquireController.getAllInquires);

//update payment request
router.patch(
  "/:inqid",
  [
     check("name").not().isEmpty(),
    check("customId").not().isEmpty(),
    check("email").not().isEmpty(),
    check("type").not().isEmpty(),
    check("address"),
  ],
  inquireController.updateInquire
);

module.exports = router;
