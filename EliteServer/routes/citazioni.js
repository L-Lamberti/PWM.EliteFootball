const express = require('express');
const db = require('../databaseElite/db');
const router = express.Router();

router.get('/', (req, res) => {
  db.all(
    'SELECT * FROM citazioni',
    [],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Errore nel database' });
      }
      res.json(rows);
    }
  );
});

module.exports = router;
