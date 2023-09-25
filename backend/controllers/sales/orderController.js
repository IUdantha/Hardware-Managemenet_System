const asyncHandler = require('express-async-handler')


//Bring the module
const Order = require('../../models/sales/orderModel')
const User = require('../../models/auth/userModel')

const Items = require('../../models/inventory/itemModel')


exports.addToOrder = async (req, res) => {
    try {
      const order = await Order.findOne({ userId: req.user._id });
      const item = await Items.findById(req.params.ItemId);
  
      if (!item) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const itemIndex = order.items.findIndex(p => p.itemId == req.params.itemId);
  
      if (itemIndex > -1) {
        let item = order.items[itemIndex];
        item.quantity++;
        order.items[itemIndex] = item;
      } else {
        cart.items.push({
          itemId: req.params.itemId,
          quantity: 1,
          price: product.price,
          name: product.name
        });
      }
  
      order.totalPrice += item.price;
  
      const updatedCart = await order.save();
  
      res.json(updatedCart);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };






 
/*

//@desc set driver
//@route POST /api/drivers
// @access Private
const addToOrder = asyncHandler(async (req,res) => {

    const { quantity,price} = req.body

    if(!quantity || price ){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    /*const driverExists = await Driver.findOne({email})

    if(driverExists){
        res.status(400)
        throw new Error('Driver already exists')
    }

    //create user
    const order = await Order.create({
        user: req.user.id, 
        item: req.items.id,
        quantity: req.body.quantity,
        price: req.body.price,

    })

    res.status(200).json(order)

})

module.exports = {
    addToOrder
}
*/