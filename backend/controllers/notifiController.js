const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/finance/http-error");
const Notification = require("../models/notification");

//create notification
const createNotifi = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { message, dateTime } = req.body;

  const createdNotifi = new Notification({
    message,
    dateTime,
  });

  try {
    await createdNotifi.save();
  } catch (err) {
    const error = new HttpError(
      "Creating notification record failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({ Notification: createdNotifi });
};

//read all notification
const getAllNotifi = async (req, res, next) => {
  let notifis;
  try {
    notifis = await Notification.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    notifis: notifis.map((user) => user.toObject({ getters: true })),
  });
};

//delete notification
const deleteNotifi = async (req, res, next) => {
  const notifiid = req.params.notifiid;

  let notifi;
  try {
    notifi = await Notification.findById(notifiid);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete notification.",
      500
    );
    return next(error);
  }

  if (!notifi) {
    const error = new HttpError("Could not find notification for this id", 404);
    return next(error);
  }

  try {
    await notifi.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete notification.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted notification." });
};

exports.createNotifi = createNotifi;
exports.getAllNotifi = getAllNotifi;
exports.deleteNotifi = deleteNotifi;
