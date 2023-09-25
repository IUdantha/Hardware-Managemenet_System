const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../../models/customer/inquireModel");
const Inquire= require("../../models/customer/inquireModel");

//create inquire
const createInquire = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, customId, email, contact, type, address } = req.body;

  const createdInquire = new Inquire({
    name,
    customId,
    email,
    contact,
    type,
    address,
  });

  try {
    await createdInquire.save();
  } catch (err) {
    const error = new HttpError(
      "Creating inquire record failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({ Inquire: createdInquire });
};

//delete Inquire
const deleteInquire = async (req, res, next) => {
  const inqId = req.params.inqid;

  let inquire;
  try {
    inquire = await Inquire.findById(inqId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete inquire.",
      500
    );
    return next(error);
  }

  if (!inquire) {
    const error = new HttpError("Could not find inquire for this id", 404);
    return next(error);
  }

  try {
    await inquire.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete inquire.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted inquire." });
};

//read inquire
const getInquireById = async (req, res, next) => {
  const inqId = req.params.inqid;

  let inquire;
  try {
    inquire = await Inquire.findById(inqId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a inquire.",
      500
    );
    return next(error);
  }

  if (!inquire) {
    const error = new HttpError(
      "Could not find a inquire for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ inquire: inquire.toObject({ getters: true }) }); // => { inquire } => { inquire: inquire }
};

//update inquire
const updateInquire = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, customId, email, contact, type, address } = req.body;

  const inqId = req.params.inqid;

  let inquire;
  try {
    inquire = await Inquire.findById(inqId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldnot update inquire.",
      500
    );
    return next(error);
  }

  inquire.name = name;
  inquire.customId = customId;
  inquire.email = email;
  inquire.contact = contact;
  inquire.type = type;
  inquire.address = address;

  try {
    await inquire.save();
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong, could not update inquire.",
      500
    );
  }

  res.status(200).json({ inquire: inquire.toObject({ getters: true }) });
};

//read all inquires
const getAllInquires = async (req, res, next) => {
  let inquires;
  try {
    inquires = await Inquire.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    inquires: inquires.map((user) => user.toObject({ getters: true })),
  });
};

exports.createInquire = createInquire;
exports.deleteInquire = deleteInquire;
exports.getInquireById = getInquireById;
exports.getAllInquires = getAllInquires;
exports.updateInquire = updateInquire;
