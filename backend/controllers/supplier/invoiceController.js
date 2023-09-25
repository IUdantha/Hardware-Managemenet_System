const asyncHandler = require('express-async-handler')

const Invoice = require('../../models/supplier/invoiceModel')
const User = require('../../models/auth/userModel')


//@desc Get Invoices
//@route GET /api/invoices
//@access Private
const getInvoices =asyncHandler( async (req,res) => {
const invoices = await Invoice.find({user: req.user.id})

    res.status(200).json(invoices)
})


//@desc Set Invoices
//@route POST /api/invoices
//@access Private
const setInvoice = asyncHandler( async (req,res) => {
    
    const { reqId , description } = req.body

    if (!reqId || !description) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const invoiceExists = await Invoice.findOne({reqId})

    if(invoiceExists){
        res.status(400)
        throw new Error('Invoice already exists')
    }

    //create user
    const invoice = await Invoice.create({
        user: req.user.id, 
        reqId: req.body.reqId,
        description: req.body.description,

    })

    res.status(200).json(invoice)
})

//@desc Update Invoice
//@route PUT /api/invoices/:id
//@access Private
const updateInvoice =asyncHandler( async (req,res) => {
    const invoice = await Invoice.findById(req.params.id)

    if(!invoice){
        res.status(400)
        throw new Error('Invoice not found')
    }

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches
    if(invoice.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
    } )

    res.status(200).json(updatedInvoice)
})

//@desc Delete Invoice
//@route DELETE /api/invoices/:id
//@access Private
const deleteInvoice =asyncHandler( async (req,res) => {
    const invoice = await Invoice.findById(req.params.id)

    if(!invoice){
        res.status(400)
        throw new Error('Invoice not found')
    }

    await Invoice.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getInvoices,
    setInvoice,
    updateInvoice,
    deleteInvoice
}