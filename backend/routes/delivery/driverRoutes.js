const express = require('express')
const router = express.Router()

//Get the functions
const { 
    getDrivers,
    setDriver,
    updateDriver,
    deleteDriver,
    getProfile,
} = require('../../controllers/delivery/driverController')

const {protect} = require('../../middleware/authMiddleware')
const { header } = require('express-validator')


//(Here the '/' is enough. because the api call is specified in server.js file)


router.route('/').get(getDrivers).post(setDriver)

router.route('/:id').patch(updateDriver).delete(deleteDriver)

router.get('/:id',getProfile)

 

module.exports = router
