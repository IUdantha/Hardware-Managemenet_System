const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    //We can create it as an object and give the details

    //Hv to include the user.
    //To know who create the goal,...
    user: {
        //The type should be an object ID
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',  //which model the objectId relate to
    },

    text: {
        type: String,
        required: [true, 'Please add a text value']
    }
}, 
{
    timestamps: true,
}

)

module.exports = mongoose.model('Goal', goalSchema)