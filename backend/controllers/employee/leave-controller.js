const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../../models/employee/http-error");
const Leave = require("../../models/employee/leave");

//create payment
const createLeave = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { empid, name, reason, date, time, note } = req.body;

  const createdLeave = new Leave({
    empid,
    name,
    reason,
    date,
    time,
    note,
  });

  try {
    await createdLeave.save();
  } catch (err) {
    const error = new HttpError(
      "Creating request  failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({ Leave: createdLeave });
};
 /*
//delete payment
const deleteLeave = async (req, res, next) => {
  const leaveId = req.params.leaveid;

  let leave;
  try {
    leave = await Leave.findById(payId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete payment.",
      500
    );
    return next(error);
  }

  if (!leave) {
    const error = new HttpError("Could not find leave for this id", 404);
    return next(error);
  }

  try {
    await leave.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete leave.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted leave." });
};*/

//read leave by mananger
const getLeaveById = async (req, res, next) => {
  const leaveId = req.params.leaveid;

  let leave;
  try {
    leave = await Leave.findById(leaveId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a leave.",
      500
    );
    return next(error);
  }

  if (!leave) {
    const error = new HttpError(
      "Could not find a leave for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ leave: leave.toObject({ getters: true }) }); // => { leave } => { leave: leave }
};



//read all leaves
const getAllLeaves = async (req, res, next) => {
  let leaves;
  try {
    leaves = await Leave.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    leaves: leaves.map((user) => user.toObject({ getters: true })),
  });
};


exports.createLeave = createLeave;
//exports.deleteLeave = deleteLeave;
exports.getLeaveById = getLeaveById;
exports.getAllLeaves = getAllLeaves;
