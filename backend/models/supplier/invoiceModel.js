const mongoose = require('mongoose')

const invoiceSchema = mongoose.Schema({
    user: {
        //The type should be an object ID
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',  //which model the objectId relate to
    },

    reqId: {
        type: String,
        required: [true, 'Please add a Request ID'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please add a Description']
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Invoice',invoiceSchema)