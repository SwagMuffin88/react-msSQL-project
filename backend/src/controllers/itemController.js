const { poolPromise, sql } = require('../config/db');

exports.createItem = async (req, res) => {
    try {
        const { content } = req.body;
        const pool = await poolPromise;

        await pool.request()
            .input('contentInput', sql.NVarChar, content)
            .query('INSERT INTO Items (Content) VALUES (@contentInput)');

        res.status(201).json({ message: 'Andmed salvestatud!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Items');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};