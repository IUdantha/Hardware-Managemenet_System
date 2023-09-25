const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const inquireSchema = new Schema({
  name: { type: String, required: true },
  customId: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: Number, required: true },
  type: { type: String, required: true },
  address: { type: String },
});

module.exports = mongoose.model("Inquire", inquireSchema);
