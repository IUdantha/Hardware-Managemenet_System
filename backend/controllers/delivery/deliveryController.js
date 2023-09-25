
const asyncHandler = require('express-async-handler')


//Bring the module
const Delivery = require('../../models/delivery/deliveryModel')
const User = require('../../models/auth/userModel')

//@desc get delivery
//@route GET /api/ deliveries
//@access Private
const getDeliveries = asyncHandler(async (req,res) => {
    //can pass a object and find it by them. (for this we use all)
    const deliveries = await Delivery.find({})    //We await becuase it is asynchronous

    res.json({
        deliveries: deliveries.map((user) => user.toObject({ getters: true })),
      });
})

//@desc set  delivery
//@route POST /api/ deliveries
// @access Private
const setDelivery = asyncHandler(async (req,res) => {

    const { name, orderId, contact, email, address, distance, cost, time} = req.body

    if(!name || !orderId || !contact || !email || !address || !distance || !cost || !time ){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    const deliveryExists = await Delivery.findOne({orderId})

    if(deliveryExists){
        res.status(400)
        throw new Error('Delivery details already exists')
    }

    //creat delivery
    const delivery = await Delivery.create({
        // user: req.user.id, 
        name: req.body.name,
        orderId: req.body.orderId,
        contact: req.body.contact,
        email: req.body.email,
        address: req.body.address,
        distance: req.body.distance,
        cost: req.body.cost,
        time: req.body.time,

    })

    res.status(200).json(delivery)

})


//@desc update  delivery
//@route PUT /api/ deliveries/:id
// @access Private
const updateDelivery = asyncHandler(async (req,res) => {

    //Get the  delivery we want to update
    const delivery = await Delivery.findById(req.params.id)

    if(!delivery){
        res.status(400)
        throw new Error('Delivery details not found')
    }

    const updatedDelivery = await Delivery.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,  //create if it doesn't exist
        })
    res.status(200).json(updatedDelivery)
})

//@desc delete  delivery
//@route DELETE /api/ deliveries
// @access Private
const deleteDelivery = asyncHandler(async(req,res) => {


     const delivery = await Delivery.findById(req.params.id)

     if(!delivery){
         res.status(400)
         throw new Error('Delivery details not found')
     }
     
     //no need to assign it to a variable because we don't need to save it
     await Delivery.findByIdAndRemove(req.params.id)

    res.status(200).json({ id: req.params.id })   // for the frontend we'll need the id
    
})

//@desc get driver profile
//@route GET /api/drivers/
// @access Private
const getDelivery = asyncHandler(async (req,res) => {

    //Get the driver we want to update
    const delivery = await Delivery.findById(req.params.id)

    if(!delivery){
        res.status(400)
        throw new Error('Delivery not found')
    }

    res.json({ delivery: delivery.toObject({ getters: true }) });
})


module.exports = {
    getDeliveries,
    setDelivery,
    updateDelivery,
    deleteDelivery,
    getDelivery
}