const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storerequestSchema = new Schema({
    itemid: {type: String,required: true},
    quantity: {type: Number,required: true},
    isaccept: {type: Boolean},  
});

module.exports = mongoose.model("StoreRequest", storerequestSchema);
