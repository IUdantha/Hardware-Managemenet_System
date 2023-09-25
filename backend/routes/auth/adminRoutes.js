const express = require('express')
const router = express.Router()
const{ 
    registerAdmin,
    getProfile
 
 } = require('../../controllers/auth/adminController')

 //protect the route
const {protect} = require('../../middleware/authMiddleware')

//Register to the system
router.post('/', registerAdmin)
router.get('/:id', getProfile)



module.exports = router