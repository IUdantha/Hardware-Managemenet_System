
const asyncHandler = require('express-async-handler')


//Bring the module
const Driver = require('../../models/delivery/driverModel')
const User = require('../../models/auth/userModel')

//@desc get driver
//@route GET /api/drivers
//@access Private
const getDrivers = asyncHandler(async (req,res) => {
    //can pass a object and find it by them. (for this we use all)
    const drivers = await Driver.find({})    //We await becuase it is asynchronous

    //we return the driver
    res.json({
      drivers: drivers.map((user) => user.toObject({ getters: true })),
    });
})

//@desc set driver
//@route POST /api/drivers
// @access Private
const setDriver = asyncHandler(async (req,res) => {

    const { name,nic, email, contact, address, licenceNo, plateNo} = req.body

    if(!name || !nic|| !email || !contact || !address || !licenceNo || !plateNo  ){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    const driverExists = await Driver.findOne({email})

    if(driverExists){
        res.status(400)
        throw new Error('Driver already exists')
    }

    //create user
    const driver = await Driver.create({
     
        name: req.body.name,
        nic: req.body.nic,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        licenceNo: req.body.licenceNo,
        plateNo: req.body.plateNo,

    })

    res.status(200).json(driver)

})


//@desc update driver
//@route PUT /api/drivers/:id
// @access Private
const updateDriver = asyncHandler(async (req,res) => {

    //Get the driver we want to update
    const driver = await Driver.findById(req.params.id)

    if(!driver){
        res.status(400)
        throw new Error('Driver not found')
    }

    const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,  //create if it doesn't exist
        })
    res.status(200).json(updatedDriver)
})

//@desc delete driver
//@route DELETE /api/drivers
// @access Private
const deleteDriver = asyncHandler(async(req,res) => {

     //Get the goal we want to delete
     const driver = await Driver.findById(req.params.id)

     if(!driver){
         res.status(400)
         throw new Error('Driver not found')
     }
     
     //no need to assign it to a variable because we don't need to save it
     await Driver.findByIdAndRemove(req.params.id)

    res.status(200).json({ id: req.params.id })   // for the frontend we'll need the id
    
})

//@desc get driver profile
//@route GET /api/drivers/
// @access Private
const getProfile = asyncHandler(async (req,res) => {

    //Get the driver we want to update
    const driver = await Driver.findById(req.params.id)

    if(!driver){
        res.status(400)
        throw new Error('Driver not found')
    }

    res.json({ driver: driver.toObject({ getters: true }) });
})


module.exports = {
    getDrivers,
    getProfile,
    setDriver,
    updateDriver,
    deleteDriver
}