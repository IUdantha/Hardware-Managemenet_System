const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const loanSchema = new Schema({
  loanNum: { type: String, required: true },
  loanType: { type: String, required: true },
  amount: { type: Number, required: true },
  interest: { type: Number, required: true },
  period: { type: String, required: true },
  monthPayment: { type: Number, required: true },
  note: { type: String },
});

module.exports = mongoose.model("Loan", loanSchema);
