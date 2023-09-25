const mongoose = require('mongoose')

const deliverySchema = mongoose.Schema({


    name: {
        type: String,
        required: [true, 'Please add a name']
    },

    orderId: {
        type: String,
        required: [true, 'Please add Order Id'],
        unique: true
    },

    contact: {
        type: Number,
        required: [true, 'Please add a contact number']
    },

    email: {
        type: String,
        required: [true, 'Please add a email'],

    },

    address: {
        type: String,
        required: [true, 'Please add a address']
    },

    distance: {
        type: String,
        required: [true, 'Please Select Distance'],
    },

    cost: {
        type: Number,
        required: [true],
  
    },
    
    time: {
        type: String,
        required: [true],
    
    },
}, 
{
    timestamps: true,
}

)

module.exports = mongoose.model('Delivery', deliverySchema)