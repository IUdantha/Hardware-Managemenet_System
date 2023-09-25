const express = require('express')
const router = express.Router()

//Get the functions
const { 
    getDeliveries,
    setDelivery,
    updateDelivery,
    deleteDelivery,
    getDelivery
} = require('../../controllers/delivery/deliveryController')

const {protect} = require('../../middleware/authMiddleware')

router.route('/').get(getDeliveries).post(setDelivery)

router.route('/:id').patch(updateDelivery).delete(deleteDelivery)

router.get('/:id',getDelivery)

module.exports = router