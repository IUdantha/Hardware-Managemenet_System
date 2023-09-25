const express = require('express');
const router = express.Router();

const OrderController = require('../../controllers/sales/orderController')

const {protect} = require('../../middleware/authMiddleware')


// add item to order list

router.post('/:itemId', OrderController.addToOrder)



module.exports = router