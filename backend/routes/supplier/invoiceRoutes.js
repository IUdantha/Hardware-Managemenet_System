const express = require('express')
const router = express.Router()
const { getInvoices,setInvoice,updateInvoice,deleteInvoice } = require('../../controllers/supplier/invoiceController')

const {protect} = require('../../middleware/authMiddleware')


router.route('/').get(protect,getInvoices).post(protect,setInvoice)
router.route('/:id').delete(protect,deleteInvoice).put(protect,updateInvoice)


module.exports = router