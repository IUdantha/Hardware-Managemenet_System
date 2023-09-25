const asyncHandler = require("express-async-handler");

const User = require("../../models/auth/userModel");
const Item = require("../../models/inventory/itemModel");

/*      -----------------------------------      */

const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../../models/finance/http-error");
//const Payment = require("../../models/finance/payment");

//create payment
const setItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { itemname, description, price, category, imagepath, stock } = req.body;

  const createdItem = new Item({
    itemname,
    description,
    price,
    category,
    imagepath,
    stock,
  });

  try {
    await createdItem.save();
  } catch (err) {
    const error = new HttpError(
      "Creating item record failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({ Item: createdItem });
};

//read all payments
const getItems = async (req, res, next) => {
  let items;
  try {
    items = await Item.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    items: items.map((user) => user.toObject({ getters: true })),
  });
};

//read payment
const getItemById = async (req, res, next) => {
  console.log("Getting item details");
  const itemId = req.params.itemid;

  let item;
  try {
    item = await Item.findById(itemId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a payment.",
      500
    );
    return next(error);
  }

  if (!item) {
    const error = new HttpError(
      "Could not find a payment for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ item: item.toObject({ getters: true }) }); // => { payment } => { payment: payment }
};

//update payment
const updateItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { itemname, description, price, category, imagepath, stock } = req.body;

  const itemId = req.params.itemid;

  let item;
  try {
    item = await Item.findById(itemId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldnot update payment.",
      500
    );
    return next(error);
  }

  item.itemname = itemname;
  item.description = description;
  item.price = price;
  item.category = category;
  item.imagepath = imagepath;
  item.stock = stock;

  try {
    await item.save();
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong, could not update payment.",
      500
    );
  }

  res.status(200).json({ item: item.toObject({ getters: true }) });
};

//delete payment
const deleteItem = async (req, res, next) => {
  const itemId = req.params.itemid;

  let item;
  try {
    item = await Item.findById(itemId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete payment.",
      500
    );
    return next(error);
  }

  if (!item) {
    const error = new HttpError("Could not find payment for this id", 404);
    return next(error);
  }

  try {
    await item.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete payment.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted item." });
};

/*    ----------------------------------------------    */

/*
//@desc get items
//@route GET /api/items
//@access Private

const getItems = asyncHandler(async (req,res) => {
    //can pass a object and find it by them. (for this we use all)
    const items = await Item.find({user: req.user.id})    //We await becuase it is asynchronous

    //we return the items
    res.status(200).json(items)
})

//@desc set item
//@route POST /api/items
// @access Private
const setItem = asyncHandler(async (req,res) => {

    const {itemname, itemid, unit, price, stock} = req.body

    if(!itemname || !itemid || !unit || !price || !stock){
        res.status(400)
        throw new Error('Please add all fields')
    }
    
    const itemExists = await Item.findOne({itemid})

    if(itemExists){
        res.status(400)
        throw new Error('Item already exists')
    }

    //create user
    const item = await Item.create({
        user: req.user.id, 
        itemname: req.body.itemname,
        itemid: req.body.itemid,
        unit: req.body.unit,
        price: req.body.price,
        stock: req.body.stock,

    })

    res.status(200).json(item)

})



//@desc update item
//@route PUT /api/items/:id
// @access Private
const updateItem = asyncHandler(async (req,res) => {

    //Get the item we want to update
    const item = await Item.findById(req.params.id)

    if(!item){
        res.status(400)
        throw new Error('Item not found')
    }


     //check for user
     if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the 'item' user
    if(item.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,  //create if it doesn't exist
        })
    res.status(200).json(updatedItem)
})

//@desc delete item
//@route DELETE /api/items
// @access Private
const deleteItem = asyncHandler(async(req,res) => {

    //Get the goal we want to delete
    const item = await Item.findById(req.params.id)

    if(!item){
        res.status(400)
        throw new Error('Item not found')
    }
    
    //no need to assign it to a variable because we don't need to save it
    await Item.findByIdAndRemove(req.params.id)

   res.status(200).json({ id: req.params.id })   // for the frontend we'll need the id  
})



const getSpecificItem =asyncHandler(async(req,res) => {

    //Get the item we want to show
    const item = await Item.findById(req.params.id)

    if(!item){
        res.status(400)
        throw new Error('Item not found')
    }

     //check for user
     if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the 'item' user
    if(item.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    res.status(200).json(item)
}) 
*/
module.exports = {
  getItems,
  setItem,
  updateItem,
  deleteItem,
  getItemById,
};
