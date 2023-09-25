const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../../models/sales/http-error");
const OrderCart = require("../../models/sales/orderCartModel");

// create cart item

const addItemCart = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid inputs passed, please check your data.", 422)
      );
    }
  
    const { quantity,} = req.body;
  
    const createdCart = new ItemCart({
      quantity,
    });
  
    try {
      await createdCart.save();
    } catch (err) {
      const error = new HttpError(
        "Creating Cart record failed, please try again.",
        500
      );
      console.log(err);
      return next(error);
    }
  
    res.status(201).json({ ItemCart: createdCart });
  };

  exports.addItemCart = addItemCart;