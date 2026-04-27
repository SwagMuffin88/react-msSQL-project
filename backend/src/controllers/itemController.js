const { poolPromise, sql } = require('../config/db'); 

// CREATE - lisa uus kirje
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

// READ - saa kõik kirjed
exports.getAllItems = async (req, res) => {
    try {
        const result = await sql.query`SELECT * FROM Items ORDER BY CreatedAt DESC`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// READ - saa üks kirje ID järgi
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

// UPDATE - muuda üht kirjet
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

// DELETE - kustuta üks kirje
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