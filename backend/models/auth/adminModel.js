const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    nic: {
        type: String,
        required: [true, 'Please add the NIC Number'],
        unique: true
    },


    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },

    type: {
        type: String,
        required: [true, 'Please add a type'],

    },


    contact: {
        type: Number,
        required: [true, 'Please add a contact number'],
        unique: true
    },

    address: {
        type: String,
        required: [true, 'Please add an address'],
      
    },
  
    
   
},
{
    timestamps: true,
})

module.exports = mongoose.model('Admin', adminSchema)
