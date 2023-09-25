
const mongoose = require('mongoose');

const offorderSchema = new mongoose.Schema({
  itemname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
   category: {
    type: String,
    required: true
  },
  stock: {
    type: String,
    required: true
  },
  quantity: {
    type: Number ,
    required: true
  },
  totPrice: {
    type: Number,
    required: true
  }
});

const offOrder = mongoose.model('OffOrders', offorderSchema);
module.exports = offOrder;


/*
const mongoose = require('mongoose');

const offorderSchema = new mongoose.Schema({
  itemCode: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
 // customerInfo: { type: String, required: true },
  
});

const offOrder = mongoose.model('OffOrder', offorderSchema);

module.exports = offOrder;


/*
const mongoose = require('mongoose');

const offorderSchema = new mongoose.Schema({
  items: {
    type: Array,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const offOrder = mongoose.model('OffOrder', offorderSchema);

module.exports = offOrder;
*/