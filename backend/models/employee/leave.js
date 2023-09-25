const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const empleaveSchema = new Schema({
  empid: { type: String, required: true },
  name: { type: String, required: true },
  reason: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  note: { type: String },
});

module.exports = mongoose.model("Leave", empleaveSchema);
