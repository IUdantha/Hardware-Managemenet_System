const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../../models/customer/http-error");
const Feedback = require("../../models/customer/feedbackModel");

//create feedback
const createFeedback = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, type, contact, date,  help, reccomend, easy, happy } = req.body;

  const createdFeedback = new Feedback({
    name,
    email,
    type,
    contact,
    date,
    help, 
    reccomend,
    easy, 
    happy,
  });

  try {
    await createdFeedback.save();
  } catch (err) {
    const error = new HttpError(
      "Creating feedback record failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({ Feedback: createdFeedback });
};

/*
//delete Feedback
const deleteFeedback = async (req, res, next) => {
  const feedId = req.params.feedid;

  let feedback;
  try {
    feedback = await Feedback.findById(feedId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete feedback.",
      500
    );
    return next(error);
  }

  if (!feedback) {
    const error = new HttpError("Could not find feedback for this id", 404);
    return next(error);
  }

  try {
    await feedback.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete feedback.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted feedback." });
}; */

/*
//read feedback
const getFeedbackById = async (req, res, next) => {
  const feedId = req.params.feedid;

  let feedback;
  try {
    feedback = await Feedback.findById(feedId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a feedback.",
      500
    );
    return next(error);
  }

  if (!feedback) {
    const error = new HttpError(
      "Could not find a feedback for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ feedback: feedback.toObject({ getters: true }) }); // => { feedback } => { feedback: feedback }
};

//update feedback
const updateFeedback = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, email, type, contact, date,  help, reccomend, easy, happy } = req.body;

  const feedId = req.params.feedid;

  let feedback;
  try {
    feedback = await Feedback.findById(feedId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldnot update feedback.",
      500
    );
    return next(error);
  }

  feedback.name = name;
  feedback.email = email;
  feedback.type = type;
  feedback.contact = contact;
  feedback.date = date;
  feedback.know = know;
  feedback.help = help;
  feedback.reccomend = reccomend;
  feedback.easy = easy;
  feedback.happy = happy;

  try {
    await feedback.save();
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong, could not update feedback.",
      500
    );
  }

  res.status(200).json({ feedback: feedback.toObject({ getters: true }) });
}; */

//read all feedbacks
const getAllFeedbacks = async (req, res, next) => {
  let feedbacks;
  try {
    feedbacks = await Feedback.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    feedbacks: feedbacks.map((user) => user.toObject({ getters: true })),
  });
};

exports.createFeedback = createFeedback;
//exports.deleteFeedback = deleteFeedback;
//exports.getFeedbackById = getFeedbackById;
exports.getAllFeedbacks = getAllFeedbacks;
//exports.updateFeedback = updateFeedback;

/*
//delete payment
const deletePayment = async (req, res, next) => {
  const payId = req.params.payid;

  let payment;
  try {
    payment = await Payment.findById(payId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete payment.",
      500
    );
    return next(error);
  }

  if (!payment) {
    const error = new HttpError("Could not find payment for this id", 404);
    return next(error);
  }

  try {
    await payment.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete payment.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted payment." });
};

//read payment
const getPaymentById = async (req, res, next) => {
  const payId = req.params.payid;

  let payment;
  try {
    payment = await Payment.findById(payId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a payment.",
      500
    );
    return next(error);
  }

  if (!payment) {
    const error = new HttpError(
      "Could not find a payment for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ payment: payment.toObject({ getters: true }) }); // => { payment } => { payment: payment }
};

//update payment
const updatePayment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { recNub, description, type, date, amount, note } = req.body;

  const payId = req.params.payid;

  let payment;
  try {
    payment = await Payment.findById(payId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldnot update payment.",
      500
    );
    return next(error);
  }

  payment.recNub = recNub;
  payment.description = description;
  payment.type = type;
  payment.date = date;
  payment.amount = amount;
  payment.note = note;

  try {
    await payment.save();
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong, could not update payment.",
      500
    );
  }

  res.status(200).json({ payment: payment.toObject({ getters: true }) });
};

//read all payments
const getAllPayments = async (req, res, next) => {
  let payments;
  try {
    payments = await Payment.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    payments: payments.map((user) => user.toObject({ getters: true })),
  });
}; */

//exports.createFeedback = createFeedback;
//exports.deletePayment = deletePayment;
//exports.getPaymentById = getPaymentById;
//exports.getAllPayments = getAllPayments;
//exports.updatePayment = updatePayment;
