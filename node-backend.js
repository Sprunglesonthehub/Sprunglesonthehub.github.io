const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 2500;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize database
const db = new sqlite3.Database('downloads.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to the database.');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS download_count (id INTEGER PRIMARY KEY, count INTEGER)`);

// Initialize count if not exists
db.run(`INSERT OR IGNORE INTO download_count (id, count) VALUES (1, 0)`);

// Get download count
app.get('/get-download-count', (req, res) => {
  db.get(`SELECT count FROM download_count WHERE id = 1`, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ count: row.count });
    }
  });
});

// Increment download count
app.post('/increment-download-count', (req, res) => {
  db.run(`UPDATE download_count SET count = count + 1 WHERE id = 1`, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      db.get(`SELECT count FROM download_count WHERE id = 1`, (err, row) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ count: row.count });
        }
      });
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at https://darrengames.ddns.net:${PORT}`);
});
