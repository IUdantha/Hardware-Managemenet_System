/*const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const orderCartSchema = new Schema({

    cartItems:[{

        itemId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"items",
            required:true,
        },

        quantity: {
            type:Number,
            required: true,
        },

        price:{
            type:Number,
            required:true,
        },
 
    }],

    totUnit:{type: Number, required: true},

    totPrice: {type:Number, required: true},
});


module.exports = mongoose.model("OrderCart", orderCartSchema);

*/