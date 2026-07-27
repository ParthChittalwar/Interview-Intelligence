const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to Database Successfully');
    } catch (error) {
        console.log("Error in connecting to Database",error);
    }
}

module.exports = connectDB;