const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/auth/userModel')

const protect = asyncHandler(async(req, res, next) => {

    //initialize a variable
    let token

    //we check the authorisation objects of the http header
    //Token is formated as 'Bearer .....'.So we make sure it starts with it.
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{

            //get token from header
            //split turns it to an array
            //use [1] to just get the token
            token = req.headers.authorization.split(' ')[1]

            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Get user from the token
            req.user = await User.findById(decoded.id).select('-password')

            //calling the next part of the middleware
            next()

        }catch (error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    //If token is not there
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }