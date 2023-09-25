const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  contact: { type: Number, required: true },
  date: { type: String, required: true },
  know: { type: String },
  help: { type: String },
  reccomend: { type: String },
  easy: { type: String },
  happy: { type: String, required: true },

});

module.exports = mongoose.model("Feedback", feedbackSchema);
