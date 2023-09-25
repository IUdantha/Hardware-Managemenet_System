const express = require('express')
const router = express.Router()
const{ 
    registerUser,
    loginUser,
    getMe,
    getUsers
 } = require('../../controllers/auth/userController')

 //protect the route
const {protect} = require('../../middleware/authMiddleware')

//Register to the system
router.post('/', registerUser)

router.post('/login', loginUser)
router.get('/me',getMe)
router.get('/',getUsers)


module.exports = router