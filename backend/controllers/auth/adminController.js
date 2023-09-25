
const asyncHandler = require('express-async-handler')
const Admin = require('../../models/auth/adminModel')
const User = require('../../models/auth/userModel')
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

//@desc Register Admin
//@route POST /api/admins
//@access Public

const registerAdmin = asyncHandler(async(req, res) => {

    //when we send the request to this end point, we are going to have body data
    const { name, email,nic, contact, address, password} = req.body

    if(!name || !email || !nic || !contact || !address || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    //check if user exist
    const adminExists = await Admin.findOne({email})

    if(adminExists){
        res.status(400)
        throw new Error('Admin already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const customObjectId = new mongoose.Types.ObjectId();


    //create admin
    const admin = await Admin.create({
        _id: customObjectId,
        name: req.body.name,
        email: req.body.email,
        nic: req.body.nic,
        type: "admin",
        contact: req.body.contact,
        address: req.body.address,

    })

      //create user
      const user = await User.create({
        _id: customObjectId,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        type: "admin",

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

    res.status(200).json(admin)

})

//@desc get admin profile
//@route GET /api/admins/
// @access Private
const getProfile = asyncHandler(async (req,res) => {

    //Get the driver we want to update
    const admin = await Admin.findById(req.params.id)

    if(!admin){
        res.status(404)
        throw new Error('Admin not found')
    }

    res.json({ admin: admin.toObject({ getters: true }) });
})

//Generate JWT function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}



module.exports = {
    registerAdmin,
    getProfile
   
}
