const express = require('express')
const router = express.Router()
const { getContract,setContract,updateContract,deleteContract ,getContractById} = require('../../controllers/supplier/contractDetailsController')
// const {protect} = require('../../middleware/authMiddleware')



router.route('/').get(getContract).post(setContract)
router.route('/:id').delete(deleteContract).patch(updateContract).get(getContractById)


module.exports = router