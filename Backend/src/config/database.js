const dns = require("node:dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    if (!uri) {
        const error = new Error('MONGO_URI environment variable is required for database connection');
        console.error(error.message);
        throw error;
    }

    try {
        await mongoose.connect(uri);
        console.log('Database connected successfully');
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('Database connection failed:', message);
        throw error;
    }
}

module.exports = connectDB;