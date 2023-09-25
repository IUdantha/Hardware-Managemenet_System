const express = require("express");
const { check } = require("express-validator");

const orderCartController = require("../../controllers/sales/orderCartController");

const router = express.Router();

//create payment request
router.post(
  "/",
  [
    check("quantity").not().isEmpty(),
   
  ],
  orderCartController.addItemCart
);