const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://jenish:jenish654321@cluster0.abwwzil.mongodb.net/DOCTOR')
        .then(() => {
            console.log("mongoDB is Connected Successfully")
        })
    } catch(error) {
        console.log(`Error while connecting mongoDB ${error}`)
    }
}

module.exports = connectDB;