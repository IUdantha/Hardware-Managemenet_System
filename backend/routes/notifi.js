const express = require("express");
const { check } = require("express-validator");

const notifiController = require("../controllers/notifiController");

const router = express.Router();

//create payment request
router.post("/", notifiController.createNotifi);

//read all payments
router.get("/", notifiController.getAllNotifi);

//delete notification
router.delete("/:notifiid", notifiController.deleteNotifi);

module.exports = router;
