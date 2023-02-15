const mongoose = require('mongoose');

const dbConnection = async () =>{

    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('DB online');

    } catch (e) {
        console.log(e);
        throw new Error('Database connection error!')
    }



}

module.exports ={
    dbConnection
}