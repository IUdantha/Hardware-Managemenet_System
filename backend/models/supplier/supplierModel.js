const mongoose = require('mongoose')

const supplierSchema = mongoose.Schema({

    // user: {
    //     //The type should be an object ID
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User',  //which model the objectId relate to
    // },
    supplierId: {
        type: String,
        required: [true, 'Please add the Supplier ID'],
        unique: true
    },

    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    nic: {
        type: String,
        required: [true, 'Please add the NIC number'],
        // unique: true
    },

    email: {
        type: String,
        required: [true, 'Please add a email'],
        // unique: true
    },

    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    type: {
        type: String,
    },

    contact: {
        type: Number,
        required: [true, 'Please add a contact number']
    },
    address: {
        type: String,
        required: [true, 'Please add a address']
    },
    itemId: {
        type: String,
        required: [true, 'Please add the Item ID'],
        // unique: true
    },

    contractId: {
        type: String,
        required: [true, 'Please add the Contract ID'],
        // unique: true
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Supplier',supplierSchema)