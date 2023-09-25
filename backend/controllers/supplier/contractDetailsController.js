const asyncHandler = require('express-async-handler')

const Contract = require('../../models/supplier/contractDetailsModel')

//@desc Get Contract
//@route GET /api/contracts
//@access Private
const getContract =asyncHandler( async (req,res) => {
const contracts = await Contract.find({})

res.json({
    contracts: contracts.map((user) => user.toObject({ getters: true })),
  });
})


//@desc Get a supplier by ID
//@route GET /api/suppliers
//@access Private
const getContractById =asyncHandler( async (req,res) => {
    const contract = await Contract.findById(req.params.id)
    
    if(!contract){
        res.status(400)
        throw new Error('Contract not found')
    }

    res.json({ contract: contract.toObject({ getters: true }) });
    })



//@desc Set Contract
//@route POST /api/contracts
//@access Private
const setContract = asyncHandler( async (req,res) => {
   
    const { contractId , validFrom , validTill, description } = req.body
   
    if (!contractId || !validFrom|| !validTill || !description) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const contractExists = await Contract.findOne({contractId})

    if(contractExists){
        res.status(400)
        throw new Error('Contract already exists')
    }

    //create user
    const contract = await Contract.create({
        // user: req.user.id, 
        contractId: req.body.contractId,
        validFrom: req.body.validFrom,
        validTill: req.body.validTill,
        description: req.body.description,
        
    })

    res.status(200).json(contract)
})

//@desc Update Contract
//@route PATCH /api/contracts/:id
//@access Private
const updateContract =asyncHandler( async (req,res) => {
    const contract = await Contract.findById(req.params.id)

    if(!contract){
        res.status(400)
        throw new Error('Contract not found')
    }

    // //check for user
    // if(!req.user){
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    // //make sure the logged in user matches the 'driver' user
    // if(contract.user.toString() !== req.user.id){
    //     res.status(401)
    //     throw new Error('User not authorized')
    // }

    const updatedContract = await Contract.findByIdAndUpdate(req.params.id, req.body , {
        new: true,
    } )

    res.status(200).json(updatedContract)
})

//@desc Delete Contract
//@route DELETE /api/contracts/:id
//@access Private
const deleteContract =asyncHandler( async (req,res) => {
    const contract = await Contract.findById(req.params.id)

    if(!contract){
        res.status(400)
        throw new Error('Contract not found')
    }

    await Contract.findByIdAndDelete(req.params.id)

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getContract,
    setContract,
    updateContract,
    deleteContract,
    getContractById
}