const express = require('express')
const router = express.Router()
const{ 
    registerManager,
    getManagers,
    getProfile,
    updateManager,
    deleteManager
 
 } = require('../../controllers/auth/managerController')

 //protect the route
const {protect} = require('../../middleware/authMiddleware')

//Register to the system
router.post('/', registerManager)
router.get('/',getManagers)
router.get('/:id', getProfile)
router.patch('/:id',updateManager)
router.delete('/:id',deleteManager)


module.exports = router