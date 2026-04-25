const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

const initializeDatabase = async () => {
    try {
        let pool = await sql.connect(dbConfig);

        const createTableQuery = `
            IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Items')
            BEGIN
                CREATE TABLE Items (
                    Id INT PRIMARY KEY IDENTITY(1,1),
                    Content NVARCHAR(MAX) NOT NULL,
                    CreatedAt DATETIME DEFAULT GETDATE()
                );
            END
        `;

        await pool.request().query(createTableQuery);
        console.log("Andmebaas on valmis ja tabel kontrollitud.");
    } catch (err) {
        console.error("Viga andmebaasi seadistamisel:", err.message);
        throw err;
    }
};

module.exports = { sql, initializeDatabase };