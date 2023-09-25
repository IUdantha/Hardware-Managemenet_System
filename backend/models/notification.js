const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notifiSchema = new Schema({
  message: { type: String, required: true },
  dateTime: { type: String, required: true },
});

module.exports = mongoose.model("Notification", notifiSchema);
