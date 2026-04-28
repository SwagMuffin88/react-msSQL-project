require('dotenv').config();
const express = require('express');
const { initializeDatabase } = require('./src/config/db');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

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

const itemController = require('./src/controllers/itemController');

// API otspunktid
app.get('/api/items', itemController.getAllItems);

app.get('/api/items/:id', itemController.getItemById);

app.post('/api/items', itemController.createItem);

app.put('/api/items/:id', itemController.updateItem);

app.delete('/api/items/:id', itemController.deleteItem);

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({
        message: "Hello world! Backend is working!",
        timestamp: new Date().toISOString()
    });
});

startServer();