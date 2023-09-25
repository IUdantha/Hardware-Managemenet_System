const asyncHandler = require('express-async-handler')
const User = require('../../models/auth/userModel');
const Item = require('../../models/inventory/itemModel');
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../../models/finance/http-error");


// ------------------- create item -------------------
const setItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {itemname, description, price, category, imagepath, stock} = req.body;

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


// ------------------- read all items -------------------
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


// ------------------- read items -------------------
const getItemById = async (req, res, next) => {
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
  

  //------------------- update items -------------------
  const updateItem = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid inputs passed, please check your data.", 422)
      );
    }

    const {itemname, description, price, category, imagepath, stock} = req.body;
  
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

  
// ------------------- delete items -------------------
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



module.exports = {
    getItems,
    setItem,
    updateItem,
    deleteItem,
    getItemById
}
