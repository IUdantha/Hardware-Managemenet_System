const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supplierRequestSchema = new Schema({
    supplierid: {type: String,required: true},
    itemname: {type: String,required: true},   
    amount: {type: Number,required: true}, 
});

module.exports = mongoose.model("SupplierRequests", supplierRequestSchema);

