require('dotenv').config();
const express = require('express');
const { initializeDatabase } = require('./src/config/db');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await initializeDatabase();

        app.listen(PORT, () => {
            console.log(`Server töötab pordil ${PORT}`);
        });
    } catch (err) {
        console.error("Serveri käivitamine ebaõnnestus:", err);
        process.exit(1);
    }
};

startServer();