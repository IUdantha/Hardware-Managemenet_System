const express = require('express');
const router = express.Router();
const OffOrderController = require('../../controllers/sales/offOrderController');
const itemController = require("../../controllers/sales/itemController")

/*
//create order
router.post('/', OffOrderController.createOrder);

//get all orders
router.get('/', OffOrderController.getOrders);

//delete orders
router.delete("/:id", OffOrderController.deleteOrder);

//edit orders

router.patch("/:id",OffOrderController.updateOrder);

*/


//getItem
router.get("/:itemid",itemController.getItemById);

//getAllItems
router.get("/", itemController.getItems);

//edititems
router.patch("/:itemid", itemController.updateItem)

//deleteitems   
router.delete("/:itemid", itemController.deleteItem)

//addItems
router.post('/add', OffOrderController.createOrder);





//get all
// router.get('/', OffOrderController.getAllOrders);

//edit
//router.put('/:id', OffOrderController.editOrder);

//delete
// router.delete('/:id', OffOrderController.deleteOrder);


module.exports = router;