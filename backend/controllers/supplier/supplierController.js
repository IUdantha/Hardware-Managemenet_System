const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Supplier = require('../../models/supplier/supplierModel')
const User = require('../../models/auth/userModel')
//@desc Get Suppliers
//@route GET /api/suppliers
//@access Private
const getSupplier =asyncHandler( async (req,res) => {
const suppliers = await Supplier.find({})

res.json({
    suppliers: suppliers.map((user) => user.toObject({ getters: true })),
  });
})

//@desc Get a supplier by ID
//@route GET /api/suppliers
//@access Private
const getSupplierByID =asyncHandler( async (req,res) => {
    const supplier = await Supplier.findById(req.params.id)
    
    if(!supplier){
        res.status(400)
        throw new Error('Supplier not found')
    }

    res.json({ supplier: supplier.toObject({ getters: true }) });
    })

///@desc Get a supplier by email
//@route GET /api/suppliers
//@access Private
const getSupplierByEmail = asyncHandler(async (req, res) => {
    const { email } = req.query;
    console.log('Email:', email); // Add this line to log the email value
  
    const supplier = await Supplier.findOne({ email });
  
    if (!supplier) {
      res.status(404);
      throw new Error('Supplier not found');
    }
  
    res.json({ supplier: supplier.toObject({ getters: true }) });
  });
  


//@desc Set Suppliers
//@route POST /api/suppliers
//@access Private


const setSupplier = asyncHandler(async (req,res) => {

    const { supplierId,name,nic, email, contact, address, itemId, contractId , password} = req.body

    if(!supplierId || !name || !nic|| !email || !contact || !address || !itemId || !contractId || !password ){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    const supplierExists = await Supplier.findOne({email})

    if(supplierExists){
        res.status(400)
        throw new Error('Supplier already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Generate a custom ObjectId
    const customObjectId = new mongoose.Types.ObjectId();

    //create user
    const supplier = await Supplier.create({
        _id: customObjectId,
        // user: req.user.id, 
        supplierId: req.body.supplierId,
        name: req.body.name,
        nic: req.body.nic,
        email: req.body.email,
        password: hashedPassword,
        contact: req.body.contact,
        address: req.body.address,
        itemId: req.body.itemId,
        contractId: req.body.contractId,
        type:"supplier"
    })

    const user = await User.create({
        _id: customObjectId,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        type:"supplier" 
    })

    res.status(200).json({supplier,user})

})

//@desc Update Suppliers
//@route PUT /api/suppliers/:id
//@access Private
const updateSupplier =asyncHandler( async (req,res) => {
    const supplier = await Supplier.findById(req.params.id)

    if(!supplier){
        res.status(400)
        throw new Error('Supplier not found')
    }

    // //make sure the logged in user matches the 'driver' user
    // if(supplier.user.toString() !== req.user.id){
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    const updatedSupplier = await Supplier.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
    } )

    res.status(200).json(updatedSupplier)
})

//@desc Delete Suppliers
//@route DELETE /api/suppliers/:id
//@access Private
const deleteSupplier =asyncHandler( async (req,res) => {
    const supplier = await Supplier.findById(req.params.id)
    

    if(!supplier){
        res.status(400)
        throw new Error('Supplier not found')
    }

    await Supplier.findByIdAndDelete(req.params.id)
    await User.findOneAndDelete({email : supplier.email})

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getSupplier,
    setSupplier,
    updateSupplier,
    deleteSupplier,
    getSupplierByID,
    getSupplierByEmail
}