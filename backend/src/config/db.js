const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Ühendus MS SQL-iga loodud!');
        return pool;
    })
    .catch(err => console.log('Andmebaasi ühenduse viga: ', err));

module.exports = { sql, poolPromise };