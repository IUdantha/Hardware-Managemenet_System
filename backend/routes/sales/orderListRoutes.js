const express = require("express");
const { check } = require("express-validator");

const orderListController = require("../../controllers/sales/orderListController");

const router = express.Router();


// delete order list 

router.delete("/:orderListId", orderListController.deleteOrderList);

// read order 

router.get("/:orderListId", orderListController.getOrderListById)


// read all order

router.get("/",orderListController.getAllOrderList);


module.exports = router;