//All the functions happen here.
//Should use 'Async' to interact with the dataBase

//To handle exceptions inside async express routes
const asyncHandler = require('express-async-handler')


//Bring the module
const Goal = require('../../models/delivery/goalModel')
const User = require('../../models/auth/userModel')

//@desc get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req,res) => {
    //can pass a object and find it by them. (for this we use all)
    const goals = await Goal.find({user: req.user.id})    //We await becuase it is asynchronous

    //we return the goals
    res.status(200).json(goals)
})

//@desc set goal
//@route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req,res) => {
    //To use body data u have to use a middleware

    //Error Handling

    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,    //give the user
    })
    res.status(200).json(goal)
})


//@desc update goals
//@route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req,res) => {

    //Get the goal we want to update
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,  //create if it doesn't exist
        })
    res.status(200).json(updatedGoal)
})

//@desc delete goals
//@route DELETE /api/goals
// @access Private
const deleteGoal = asyncHandler(async(req,res) => {

     //Get the goal we want to delete
     const goal = await Goal.findById(req.params.id)

     if(!goal){
         res.status(400)
         throw new Error('Goal not found')
     }

     //check for user
     if(!req.user){
         res.status(401)
         throw new Error('User not found')
     }
 
     //make sure the loggedin user matches the goal user
     if(goal.user.toString() !== req.user.id){
         res.status(401)
         throw new Error('User not authorized')
     }
     
     //no need to assign it to a variable because we don't need to save it
     await Goal.findByIdAndRemove(req.params.id)

    res.status(200).json({ id: req.params.id })   // for the frontend we'll need the id
    
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}