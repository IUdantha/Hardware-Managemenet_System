const express = require('express')
const router = express.Router()

//goalController.js -> goalRoutes.js
//Get the functions
const { 
    getEmployee,
    setEmployee,
    updateEmployee,
    deleteEmployee,
    getProfile
} = require('../../controllers/employee/empController')

const {protect} = require('../../middleware/authMiddleware')

//Server.js -> goalRoutes.js

//(Here the '/' is enough. because the api call is specified in server.js file)

//router.get('/', getEmployee)
//router.post('/', setEmployee)
router.route('/').get(getEmployee).post(setEmployee)


//To update and delete you need the id
//router.put('/:id', updateEmployee)
//router.delete('/:id', deleteEmployee)
router.route('/:id').patch(updateEmployee).delete(deleteEmployee)

router.get('/:id', getProfile)


module.exports = router