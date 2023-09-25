const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../../models/auth/userModel')


//@desc Register new user
//@route POST /api/users
//@access Public

const registerUser = asyncHandler(async(req, res) => {

    //when we send the request to this end point, we are going to have body data
    const { name, email, password, type} = req.body

    if(!name || !email || !password || !type){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    //check if user exist
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
    
        name,
        email,
        password: hashedPassword,
        type

    })

    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})


//@desc Authenticate a user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async(req, res) => {

    const {email, password, type} = req.body
    
    //Check for user email
    const user = await User.findOne({email})

    //compare the encrpted pw and plain text pw
    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }

})


//@desc Get user data
//@route GET /api/users
//@access Private

//Can get the correct logged in user
const getMe = asyncHandler(async(req, res) => {
    //set the user id in the middleware

    //show user info
    res.status(200).json(req.user)
})

const getUsers = asyncHandler(async(req, res) => {

    const users = await User.find({}) 
    //show user info
    res.json({
        users: users.map((user) => user.toObject({ getters: true })),
      });
})

//Generate JWT function
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}
module.exports = {
    registerUser,
    loginUser, 
    getMe,
    getUsers,
}