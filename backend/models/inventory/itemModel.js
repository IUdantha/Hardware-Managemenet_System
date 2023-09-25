
/*const mongoose = require('mongoose')

const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemname: {type: String,required: true},
    description: {type: String,required: true},
    price: {type: Number,required: true},
    category: {type: String,required: true},
    imagepath: {type: String},
    stock: {type: Number},
});


    itemname: {
        type: String,
        required: [true, 'Please add a item name'],
        unique: true
    },

    itemid: {
        type: String,
        required: [true, 'Please add an item id'],
        unique: true
    },

    unit: {
        type: String,
        required: [true, 'Please add a unit']
    },

    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
  
    stock: {
        type: Number
    },
   
})
module.exports = mongoose.model('Items', itemSchema)

*/ 

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemname: {type: String,required: true},
    description: {type: String,required: true},
    price: {type: Number,required: true},
    category: {type: String,required: true},
    imagepath: {type: String},
    stock: {type: Number},
});

module.exports = mongoose.model("Items", itemSchema);

