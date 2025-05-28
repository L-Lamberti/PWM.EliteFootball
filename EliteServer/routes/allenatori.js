const express = require('express');
const db = require('../databaseElite/db');
const router = express.Router();

router.get('/top', (req, res) => {
  db.all(
    'SELECT * FROM allenatori ORDER BY voto DESC LIMIT 10',
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
