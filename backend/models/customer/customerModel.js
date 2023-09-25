const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  recNub: { type: String, required: true ,},
  name: { type: String, required: true, unique: true },
  email:  { type: String, required: true },
  type: { type: String, required: true },
  nic: { type: String, required: true },
  date: { type: String, required: true },
  contact: { type: Number, required: true },
  address: { type: String },
});

module.exports = mongoose.model("Customer", customerSchema);
























/*const mongoose = require('mongoose')

const cusSchema = mongoose.Schema({


    recNub: {
        type: String,
        required: [true, 'Please add a recNub'],
        
    },

    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true
    },
    
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true
    },


    type: {
        type: String,
        required: [true, 'Please select a type']
      
    },

    nic: {
        type: String,
        required: [true, 'Please add the NIC number'],
        unique: true
    },

    date: {
        type: String,
        required: [true, 'Please add the Date']
       
    },

 
    contact: {
        type: Number,
        required: [true, 'Please add a contact number']
    },

    address: {
        type: String,
        required: [true, 'Please add a address']
    },
    
}, 
{
    timestamps: true,
}

)

module.exports = mongoose.model('Customer', cusSchema)*/