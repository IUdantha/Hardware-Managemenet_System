const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  recNub: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  note: { type: String },

});

module.exports = mongoose.model("Payment", paymentSchema);
