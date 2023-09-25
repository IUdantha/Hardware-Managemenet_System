const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../../models/sales/http-error");
const OrderList = require("../../models/sales/orderListModel");


//read All
const getAllOrderList = async (req, res, next) => {
    let OrderList;
    try {
      OrderList = await OrderList.find({});
    } catch (err) {
      const error = new HttpError(
        "Fetching users failed, please try again later.",
        500
      );
      return next(error);
    }
    res.json({
      OrderList: OrderList.map((user) => user.toObject({ getters: true })),
    });
  };


  // delete

  const deleteOrderList = async (req, res, next) => {
    const orderListId = req.params.orderListId;
  
    let orderList;
    try {
      orderList = await OrderList.findById(orderListId);
    } catch (err) {
      const error = new HttpError(
        "something went wrong, could not delete Order.",
        500
      );
      return next(error);
    }
  
    if (!orderList) {
      const error = new HttpError("Could not find order for this id", 404);
      return next(error);
    }
  
    try {
      await orderList.deleteOne();
    } catch (err) {
      const error = new HttpError(
        "something went wrong, could not delete payment.",
        500
      );
      return next(error);
    }
  
    res.status(200).json({ message: "Deleted orderList." });
  };



  //read orderList

  const getOrderListById = async (req, res, next) => {
    const orderListId = req.params.orderListId;
  
    let orderList;
    try {
      orderList = await OrderList.findById(orderListId);
    } catch (err) {
      const error = new HttpError(
        "Something went wrong, could not find a Order List.",
        500
      );
      return next(error);
    }
  
    if (!payment) {
      const error = new HttpError(
        "Could not find a order for the provided id.",
        404
      );
      return next(error);
    }
  
    res.json({ orderList: orderList.toObject({ getters: true }) }); // => { payment } => { payment: payment }
  };


  exports.getAllOrderList = getAllOrderList;
  exports.getOrderListById = getOrderListById;
  exports.deleteOrderList = deleteOrderList;
