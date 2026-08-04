require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3000;
let server;

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    if (server) server.close(() => process.exit(1));
    else process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    if (server) server.close(() => process.exit(1));
    else process.exit(1);
});

const start = async () => {
    try {
        const db = connectDB();
        if (db && typeof db.then === 'function') await db;
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }

    server = app.listen(PORT, () => {
        console.log('Server is running on port ' + PORT);
    });

    server.on('error', (error) => {
        console.error('Server startup error:', error);
        process.exit(1);
    });
};

start();