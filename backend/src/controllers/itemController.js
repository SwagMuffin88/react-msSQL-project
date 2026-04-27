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

exports.getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sql.query`SELECT * FROM Items WHERE Id = ${id}`;
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Kirjet ei leitud" });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const { sql } = require('../config/db');

// 1. CREATE - Lisa uus kirje
exports.createItem = async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) return res.status(400).json({ message: "Sisu on kohustuslik" });

        const result = await sql.query`
            INSERT INTO Items (Content) 
            OUTPUT INSERTED.*
            VALUES (${content})
        `;
        
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. READ - Saa kõik kirjed
exports.getAllItems = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Items ORDER BY CreatedAt DESC`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. READ - Saa üks kirje ID järgi
exports.getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sql.query`SELECT * FROM Items WHERE Id = ${id}`;
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Kirjet ei leitud" });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const result = await sql.query`
            UPDATE Items 
            SET Content = ${content} 
            OUTPUT INSERTED.*
            WHERE Id = ${id}
        `;

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Kirjet ei leitud" });
        }
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sql.query`DELETE FROM Items WHERE Id = ${id}`;

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Kirjet ei leitud" });
        }
        res.json({ message: "Kirje edukalt kustutatud" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};