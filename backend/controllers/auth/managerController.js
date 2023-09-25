
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const Manager = require('../../models/auth/managerModel')
const User = require('../../models/auth/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken'); 

//@desc Register Manager
//@route POST /api/managers
//@access Public

const registerManager = asyncHandler(async(req, res) => {

    //when we send the request to this end point, we are going to have body data
    const { name, email, nic, contact, address, password} = req.body

    if(!name || !email || !nic || !contact || !address || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    //check if user exist
    const managerExists = await Manager.findOne({email})

    if(managerExists){
        res.status(400)
        throw new Error('Manager already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const customObjectId = new mongoose.Types.ObjectId();

       //create manager
       const manager = await Manager.create({
        _id: customObjectId,
        name: req.body.name,
        email: req.body.email,
        nic: req.body.nic,
        type: "manager",
        contact: req.body.contact,
        address: req.body.address,
   

    })
       //create user
       const user = await User.create({
        _id: customObjectId,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        type: "manager",

    })

    
    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            token: generateToken(user._id)
        })
        console.log(token)
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.status(200).json(manager)
  

})

//@desc Get manager data
//@route GET /api/managers
//@access Private

const getManagers = asyncHandler(async(req, res) => {

    const managers = await Manager.find({}) 
    //show user info
    res.json({
        managers: managers.map((user) => user.toObject({ getters: true })),
      });
})

//@desc update manager 
//@route PUT /api/managers/:id
// @access Private
const updateManager = asyncHandler(async (req,res) => {

    //Get the driver we want to update
    const manager = await Manager.findById(req.params.id)

    if(!manager){
        res.status(400)
        throw new Error('Manager not found')
    }

    const updatedManager = await Manager.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,  //create if it doesn't exist
        })
    res.status(200).json(updatedManager)
})

//@desc delete manager
//@route DELETE /api/managers
// @access Private
const deleteManager = asyncHandler(async(req,res) => {

     //Get the goal we want to delete
     const manager = await Manager.findById(req.params.id)
    //  const email = manager.email
     
    //  const user = await User.findById(req.user.id)

     if(!manager){
         res.status(400)
         throw new Error('Manager not found')
     }

     //no need to assign it to a variable because we don't need to save it
     await Manager.findByIdAndRemove(req.params.id)
     await User.findOneAndDelete({email : manager.email})
     
    res.status(200).json({ id: req.params.id })   // for the frontend we'll need the id
    
})

//@desc get manager profile
//@route GET /api/managers/
// @access Private
const getProfile = asyncHandler(async (req,res) => {

    //Get the driver we want to update
    const manager = await Manager.findById(req.params.id)

    if(!manager){
        res.status(404)
        throw new Error('Manager not found')
    }

    res.json({ manager: manager.toObject({ getters: true }) });
})

//Generate JWT function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}

module.exports = {
    registerManager,
    getManagers,
    updateManager,
    deleteManager,
    getProfile
   
}
