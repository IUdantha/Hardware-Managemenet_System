const express = require('express')
const router = express.Router()

//goalController.js -> goalRoutes.js
//Get the functions
const { 
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
} = require('../../controllers/delivery/goalController')

//protect the goal routes
const {protect} = require('../../middleware/authMiddleware')

//Server.js -> goalRoutes.js

//(Here the '/' is enough. because the api call is specified in server.js file)

//router.get('/', getGoals)
//router.post('/', setGoal)
router.route('/').get(protect, getGoals).post(protect,setGoal)


//To update and delete you need the id
//router.put('/:id', updateGoal)
//router.delete('/:id', deleteGoal)
router.route('/:id').put(protect,updateGoal).delete(protect,deleteGoal)



module.exports = router