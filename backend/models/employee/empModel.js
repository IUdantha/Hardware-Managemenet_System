const mongoose = require('mongoose')

const empSchema = mongoose.Schema({

    empid: {
        type: String,
        required: [true, 'Please add employee ID']
    },


    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    
    nic: {
        type: String,
        required: [true, 'Please add the NIC']
    },

    type: {
        type: String,
        required: [true, 'Please add employee type']
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

    gender: {
        type: String,
        required: [true, 'Please add the gender']
    },

    age: {
        type: Number,
        required: [true, 'Please add the age']
    },

    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    
}, 
{
    timestamps: true,
}

)

module.exports = mongoose.model('Employee', empSchema)