const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../../models/finance/http-error");
const SupplierRequest = require('../../models/inventory/supplierRequestModel');


//------------------- Create Supplier Requests -------------------
const setSupplierRequest = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError("Invalid inputs passed, please check your data.", 422)
      );
    }
  
    const {supplierid, itemname, amount} = req.body;

    const createdSupplierRequest = new SupplierRequest({
      supplierid,
      itemname,
      amount,
    });
  
    try {
      await createdSupplierRequest.save();
    } catch (err) {
      const error = new HttpError(
        "Creating item record failed, please try again.",
        500
      );
      console.log(err);
      return next(error);
    }
  
    res.status(201).json({ Item: createdSupplierRequest });
  };


//-------------------Read all Supplier Requests -------------------
const getSupplierRequest = async (req, res, next) => {
  let supplierRequests;
  try {
    supplierRequests = await SupplierRequest.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    supplierRequests: supplierRequests.map((user) => user.toObject({ getters: true })),
  });
};


//------------------- Delete Supplier Requests -------------------
const deleteSupplierRequest = async (req, res, next) => {
  const supplierRequestid = req.params.supplierRequestid;

  let supplierRequest;
  try {
    supplierRequest = await SupplierRequest.findById(supplierRequestid);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete payment.",
      500
    );
    return next(error);
  }

  if (!supplierRequest) {
    const error = new HttpError("Could not find payment for this id", 404);
    return next(error);
  }

  try {
    await supplierRequest.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete payment.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted supplier request." });
};


  module.exports = {
    setSupplierRequest,
    getSupplierRequest,
    deleteSupplierRequest
}