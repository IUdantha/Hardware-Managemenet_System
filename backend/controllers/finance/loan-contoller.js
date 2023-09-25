const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../../models/finance/http-error");
const Loan = require("../../models/finance/loan");

//create loan
const createLoan = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { loanNum, loanType, amount, interest, period, monthPayment, note } =
    req.body;

  const createdLoan = new Loan({
    loanNum,
    loanType,
    amount,
    interest,
    period,
    monthPayment,
    note,
  });

  try {
    await createdLoan.save();
  } catch (err) {
    const error = new HttpError(
      "Creating loan record failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({ Loan: createdLoan });
};

//delete payment
const deleteLoan = async (req, res, next) => {
  const loanId = req.params.loanid;

  let loan;
  try {
    loan = await Loan.findById(loanId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete loan.",
      500
    );
    return next(error);
  }

  if (!loan) {
    const error = new HttpError("Could not find loan for this id", 404);
    return next(error);
  }

  try {
    await loan.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete loan.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted loan." });
};

//read loan
const getLoanById = async (req, res, next) => {
  const loanId = req.params.loanid;

  let loan;
  try {
    loan = await Loan.findById(loanId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a loan.",
      500
    );
    return next(error);
  }

  if (!loan) {
    const error = new HttpError(
      "Could not find a loan for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ loan: loan.toObject({ getters: true }) }); // => { payment } => { payment: payment }
};

//update loan
const updateLoan = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { loanNum, loanType, amount, interest, period, monthPayment, note } =
    req.body;

  const loanId = req.params.loanid;

  let loan;
  try {
    loan = await Loan.findById(loanId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldnot update payment.",
      500
    );
    return next(error);
  }

  loan.loanNum = loanNum;
  loan.loanType = loanType;
  loan.amount = amount;
  loan.interest = interest;
  loan.period = period;
  loan.monthPayment = monthPayment;
  loan.note = note;

  try {
    await loan.save();
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong, could not update loan.",
      500
    );
  }

  res.status(200).json({ loan: loan.toObject({ getters: true }) });
};

//read all payments
const getAllLoans = async (req, res, next) => {
  let loans;
  try {
    loans = await Loan.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    loans: loans.map((user) => user.toObject({ getters: true })),
  });
};

exports.createLoan = createLoan;
exports.deleteLoan = deleteLoan;
exports.getLoanById = getLoanById;
exports.updateLoan = updateLoan;
exports.getAllLoans = getAllLoans;
