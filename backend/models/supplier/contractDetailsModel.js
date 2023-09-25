const mongoose = require('mongoose')

const contractSchema = mongoose.Schema({
    // user: {
    //     //The type should be an object ID
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User',  //which model the objectId relate to
    // },

    contractId: {
        type: String,
        required: [true, 'Please add a Contract ID'],
        unique: true
    },

    validFrom: {
        type: String,
        required: [true, 'Please add the Date'],
    },

    validTill: {
        type: String,
        required: [true, 'Please add the Date'],
    },

    description: {
        type: String,
        required: [true, 'Please add a Description']
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Contract',contractSchema)