//use this file to connect to mongodb

const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        
        //cyan.underline is used from the color package
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    }catch(error){
        console.log(error);
        process.exit(1)         //close the process
    }
}

module.exports = connectDB