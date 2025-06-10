const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', (req, res) => {
  const query = `SELECT * FROM citazioni`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Errore:', err.message);
      return res.status(500).json({ error: 'Errore nel database' });
    }
    res.json(rows);
  });
});

module.exports = router;