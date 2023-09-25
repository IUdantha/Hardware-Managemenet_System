const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../../models/finance/http-error");
const offOrder = require("../../models/sales/offOrderModel");

//create
const createOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { itemname, description, price, category, stock, quantity, totPrice } =
    req.body;

  const createOrder = new offOrder({
    itemname,
    description,
    price,
    category,
    stock,
    quantity,
    totPrice,
  });

  try {
    await createOrder.save();
  } catch (err) {
    const error = new HttpError(
      "Creating order record failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({ offOrder: createOrder });
};

//readAll
const getAllOrders = async (req, res, next) => {
  let offOrders;
  try {
    offOrders = await offOrder.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    offOrders: offOrders.map((user) => user.toObject({ getters: true })),
  });
};

//Update
const updateInvoice = async (req, res, next) => {
  console.log("I am here!!!");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { itemname, description, price, category, stock, quantity, totPrice } =
    req.body;

  const payId = req.params.invoiceId;

  let invoice;
  try {
    invoice = await offOrder.findById(payId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, couldnot update payment.",
      500
    );
    return next(error);
  }

  invoice.itemname = itemname;
  invoice.description = description;
  invoice.price = price;
  invoice.category = category;
  invoice.stock = stock;
  invoice.quantity = quantity;
  invoice.totPrice = totPrice;

  try {
    await invoice.save();
  } catch (err) {
    const error = new HttpError(
      "Somthing went wrong, could not update invoice.",
      500
    );
  }

  res.status(200).json({ invoice: invoice.toObject({ getters: true }) });
};

const getInvoiceById = async (req, res, next) => {
  console.log("I am searching");
  const payId = req.params.invoiceId;

  let invoice;
  try {
    invoice = await offOrder.findById(payId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a invoice.",
      500
    );
    return next(error);
  }

  if (!invoice) {
    const error = new HttpError(
      "Could not find a invoice for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ invoice: invoice.toObject({ getters: true }) }); // => { payment } => { payment: payment }
};

//delete payment
const deleteInvoice = async (req, res, next) => {
  const invoiceiid = req.params.invoiceId;
  console.log(invoiceiid);
  let offOrde;
  try {
    offOrde = await offOrder.findById(invoiceiid);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete record.",
      500
    );
    return next(error);
  }

  if (!offOrde) {
    const error = new HttpError("Could not find payment for this id", 404);
    return next(error);
  }

  try {
    await offOrde.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete Order.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted payment." });
};

exports.createOrder = createOrder;
exports.updateInvoice = updateInvoice;
exports.getInvoiceById = getInvoiceById;
exports.getAllOrders = getAllOrders;
exports.deleteInvoice = deleteInvoice;
