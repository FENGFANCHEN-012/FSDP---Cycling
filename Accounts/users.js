const dbConfig = require('../../dbConfig');
const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Use dbConfig from dbconfig.js
app.post('/api/users', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    try {
        const pool = await sql.connect(dbConfig);

        const check = await pool.request()
            .input('email', sql.VarChar(100), email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (check.recordset.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashed = await bcrypt.hash(password, 10);

        await pool.request()
            .input('name', sql.VarChar(100), name)
            .input('email', sql.VarChar(100), email)
            .input('password', sql.VarChar(100), hashed)
            .query('INSERT INTO Users (name, email, password) VALUES (@name, @email, @password)');

        res.status(200).json({ message: 'User created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
