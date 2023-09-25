const express = require('express')
const router = express.Router()
const { getSupplier,setSupplier,updateSupplier,deleteSupplier, getSupplierByID, getSupplierByEmail } = require('../../controllers/supplier/supplierController')

//const {} = require('../../middleware/authMiddleware')


router.route('/').get(getSupplier).post(setSupplier)
router.route('/:id').delete(deleteSupplier).patch(updateSupplier).get(getSupplierByID)
router.route('/email').get(getSupplierByEmail);


module.exports = router