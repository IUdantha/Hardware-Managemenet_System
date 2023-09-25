/*const mongoose = require ('mongoose');

const orderSchema  = new mongoose.Schema({

    

    orderItems:[
        {
           itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'items',
            required: true
           },

         //  itemname: {type: mongoose.Schema.Types.o,required: true},

           quantity: {
            type: Number,
            default: 1,
           },

           price: {
            type: Number,
            required: true
           }
        }
    ],
    totalPrice:{
        type:Number,
        default : 0 
    }

},
{
    timestamps: true,
}


)
const Order = mongoose.model('Order',orderSchema);

module.exports = Order;
*/