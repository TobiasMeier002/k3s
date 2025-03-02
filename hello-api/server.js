const express = require('express')
const mysql = require('mysql2')

const app = express();
const port = 3000;

const db = mysql.createConnection({
        host: process.env.DB_HOST || 'mysql-service',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'meinPassword',
        database: process.env.DB_NAME || 'testdb',
        authPlugins: {
          mysql_clear_password: () => () => process.env.DB_PASSWORD || 'meinPassword',
        }
});

db.connect(err => {
        if (err) {
        console.error('Fehler beim Verbinden mit MySQL:', err);
        process.exit(1);
    }
    console.log('Verbunden mit MySQL');
});

app.get('/data', (req, res) => {
    db.query('SELECT * FROM your_table', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`API läuft auf Port ${port}`);
});
