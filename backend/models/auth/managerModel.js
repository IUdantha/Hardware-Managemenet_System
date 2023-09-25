const mongoose = require('mongoose')

const managerSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },

    nic: {
        type: String,
        required: [true, 'Please add the nic number'],
        unique: true
    },

    type: {
        type: String,
        required: [true, 'Please select a type'],
 
    },

    contact: {
        type: Number,
        required: [true, 'Please add a contact number'],

    },

    address: {
        type: String,
        required: [true, 'Please add an address'],
      
    },
  
    
   
},
{
    timestamps: true,
})

module.exports = mongoose.model('Manager', managerSchema)
