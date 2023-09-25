const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../../models/customer/http-error");
const Customer = require("../../models/customer/customerModel");
const User = require("../../models/auth/userModel");

//create customer
const createCustomer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { recNub, name, email, type, nic, date, contact, address } = req.body;

  const createdCustomer = new Customer({
    recNub,
    name,
    email,
    type,
    nic,
    date, 
    contact,
    address,
  });

  try {
    await createdCustomer.save();
  } catch (err) {
    const error = new HttpError(
      "Creating customer record failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({ Customer: createdCustomer });
};

//delete Customer
const deleteCustomer = async (req, res, next) => {
  const cusId = req.params.cusid;

  let customer;
  try {
    customer = await Customer.findById(cusId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete customer.",
      500
    );
    return next(error);
  }

  if (!customer) {
    const error = new HttpError("Could not find customer for this id", 404);
    return next(error);
  }

  try {
    await customer.deleteOne();
    await User.findOneAndDelete({email : customer.email})
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete customer.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted customer." });
};

//read Customer
const getCustomerById = async (req, res, next) => {
  const cusId = req.params.cusid;

  let customer;
  try {
    customer = await Customer.findById(cusId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a customer.",
      500
    );
    return next(error);
  }

  if (!customer) {
    const error = new HttpError(
      "Could not find a customer for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ customer: customer.toObject({ getters: true }) }); // => { Customer } => { Customer: Customer }
};

//update Customer
const updateCustomer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { recNub, name, email, type, nic, date, contact, address } = req.body;

  const cusId = req.params.cusid;

  let customer;
  try {
    customer = await Customer.findById(cusId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldnot update customer.",
      500
    );
    return next(error);
  }

  customer.recNub = recNub;
  customer.name = name;
  customer.email = email;
  customer.type = type;
  customer.nic = nic;
  customer.date = date;
  customer.contact = contact;
  customer.address = address;

  try {
    await customer.save();
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong, could not update customer.",
      500
    );
  }

  res.status(200).json({ customer: customer.toObject({ getters: true }) });
};

//read all customers
const getAllCustomers = async (req, res, next) => {
  let customers;
  try {
    customers = await Customer.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    customers: customers.map((user) => user.toObject({ getters: true })),
  });
};

exports.createCustomer = createCustomer;
exports.deleteCustomer = deleteCustomer;
exports.getCustomerById = getCustomerById;
exports.getAllCustomers = getAllCustomers;
exports.updateCustomer = updateCustomer;



















/*const asyncHandler = require('express-async-handler')


//Bring the module
const Customer = require('../../models/customer/customerModel')
const User = require('../../models/auth/userModel')


//@desc Register Customer
//@route POST /api/customers
//@access Public

const registerCustomer = asyncHandler(async(req, res) => {

    //when we send the request to this end point, we are going to have body data
    const { recNub, name, email, type, nic,date, contact, address} = req.body

    if(!recNub || !name || !email || !type || !nic || !date || !contact || !address){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    //check if user exist
    const customerExists = await Customer.findOne({email})

    if(customerExists){
        res.status(400)
        throw new Error('Customer already exists')
    }


    //create customer
    const customer = await Customer.create({
        //user: req.user.id,
        recNub: req.body.recNub,
        name: req.body.name,
        email: req.body.email,
        type: req.body.type,
        nic : req.body.nic,
        date: req.body.date,
        contact : req.body.contact,
        address : req.body.address,

    })


        res.status(200).json(customer)
          

})

//@desc Get customer data
//@route GET /api/customers
//@access Private

const getCustomers = asyncHandler(async(req, res) => {

    const customers = await Customer.find({})  //user: req.user.id
    //show user info
  //  res.status(200).json(customers)
  res.json({
  customers: customers.map((user) => user.toObject({ getters: true })),
      });
    })

//@desc update customer
//@route PUT /api/customers/:id
// @access Private
const updateCustomer = asyncHandler(async (req,res) => {

    //Get the customer we want to update
    const customer = await Customer.findById(req.params.id)

    if(!customer){
        res.status(400)
        throw new Error('Customer not found')
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,  //create if it doesn't exist
        })
    res.status(200).json(updatedCustomer)
})

//@desc delete customer
//@route DELETE /api/customers
// @access Private
const deleteCustomer = asyncHandler(async(req,res) => {

  
     const customer = await Customer.findById(req.params.id)

     if(!customer){
         res.status(400)
         throw new Error('customer not found')
     }
     
     //no need to assign it to a variable because we don't need to save it
     await Customer.findByIdAndRemove(req.params.id)

    res.status(200).json({ id: req.params.id })   // for the frontend we'll need the id
    
})

//@desc get manager profile
//@route GET /api/managers/
// @access Private
const getProfile = asyncHandler(async (req,res) => {

    //Get the driver we want to update
    const customer = await Customer.findById(req.params.id)

    if(!customer){
        res.status(400)
        throw new Error('Customer not found')
    }

    res.json({ customer: customer.toObject({ getters: true }) });
})

module.exports = {
    registerCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
    getProfile
}





// //@desc get driver
// //@route GET /api/drivers
// //@access Private
// const getCustomer = asyncHandler(async (req,res) => {
//     //can pass a object and find it by them. (for this we use all)
//     const customers = await Customer.find({user: req.user.id})    //We await becuase it is asynchronous

//     //we return the driver
//     res.status(200).json(customers)
// })

// //@desc set driver
// //@route POST /api/drivers
// // @access Private
// const setCustomer = asyncHandler(async (req,res) => {

//     const { name,nic, email, contact, address} = req.body

//     if(!name || !nic|| !email || !contact || !address ){
//         res.status(400)
//         throw new Error('Please add all fields')
//     }
    
//     const customerExists = await Customer.findOne({email})

//     if(customerExists){
//         res.status(400)
//         throw new Error('Customer already exists')
//     }

//     //create user
//     const customer = await Customer.create({
//         user: req.user.id, 
//         name: req.body.name,
//         nic: req.body.nic,
//         email: req.body.email,
//         contact: req.body.contact,
//         address: req.body.address,
        
//     })

//     res.status(200).json(customer)

// })



// //@desc update customer
// //@route PUT /api/customers/:id
// // @access Private

// const updateCustomer = asyncHandler(async (req,res) => {

//     //Get the customer we want to update
//     const customer = await Customer.findById(req.params.id)

//     if(!customer){
//         res.status(400)
//         throw new Error('Customer not found')
//     }


//      //check for user
//      if(!req.user){
//         res.status(401)
//         throw new Error('User not found')
//     }

//     //make sure the logged in user matches the 'customer' user
//     if(customer.user.toString() !== req.user.id){
//         res.status(401)
//         throw new Error('User not authorized')
//     }

//     const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body,
//         {
//             new: true,  //create if it doesn't exist
//         })
//     res.status(200).json(updatedCustomer)
// })

// //@desc delete customer
// //@route DELETE /api/customers
// // @access Private

// const deleteCustomer = asyncHandler(async(req,res) => {

//      //Get the customer we want to delete
//      const customer = await Customer.findById(req.params.id)

//      if(!customer){
//          res.status(400)
//          throw new Error('Customer not found')
//      }
     
//      //no need to assign it to a variable because we don't need to save it
//      await Customer.findByIdAndRemove(req.params.id)

//     res.status(200).json({ id: req.params.id })   // for the frontend we'll need the id
    
// })



// module.exports = {
//     getCustomer,
//     setCustomer,
//     updateCustomer,
//     deleteCustomer
// */