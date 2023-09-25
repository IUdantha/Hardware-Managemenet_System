const mongoose = require('mongoose')

const driverSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    nic: {
        type: String,
        required: [true, 'Please add the NIC number'],
        unique: true
    },

    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true
    },

    contact: {
        type: Number,
        required: [true, 'Please add a contact number']
    },
    address: {
        type: String,
        required: [true, 'Please add a address']
    },
    licenceNo: {
        type: String,
        required: [true, 'Please add the Licence Number'],
        unique: true
    },

    plateNo: {
        type: String,
        required: [true, 'Please add the Vehiclie plate number'],
        unique: true
    },
}, 
{
    timestamps: true,
}

)

module.exports = mongoose.model('Driver', driverSchema)