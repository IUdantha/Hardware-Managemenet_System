const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../../models/finance/http-error");
const StoreRequest = require('../../models/inventory/storeRequestModel');


// ------------------- Read all Store Requests -------------------
const getStoreRequest = async (req, res, next) => {
    let storerequests;
    try {
        storerequests = await StoreRequest.find({});
    } catch (err) {
      const error = new HttpError(
        "Fetching users failed, please try again later.",
        500
      );
      return next(error);
    }
    res.json({
        storerequests: storerequests.map((user) => user.toObject({ getters: true })),
    });
};


//------------------- Create Store Requests -------------------
const setStoreRequest = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid inputs passed, please check your data.", 422)
      );
    }
  
    const {itemid, quantity} = req.body;
  
    const createdStoreRequest = new StoreRequest({
      itemid,
      quantity,
    });
  
    try {
      await createdStoreRequest.save();
    } catch (err) {
      const error = new HttpError(
        "Creating item record failed, please try again.",
        500
      );
      console.log(err);
      return next(error);
    }
  
    res.status(201).json({ StoreRequest: createdStoreRequest });
  };
  
  
module.exports = {
    getStoreRequest,
    setStoreRequest
}