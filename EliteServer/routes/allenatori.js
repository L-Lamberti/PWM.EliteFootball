const express = require('express');
const db = require('../db');
const router = express.Router();

// Rotta: Ottieni i migliori allenatori ordinati per voto
router.get('/top', (req, res) => {
  const query = `
    SELECT DISTINCT *
    FROM allenatori
    ORDER BY voto DESC
    LIMIT 10
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Errore:', err.message);
      return res.status(500).json({ error: 'Errore nel database' });
    }
    res.json(rows);
  });
});

// Rotta: Dettagli singolo allenatore
router.get('/:id', (req, res) => {
  const id = req.params.id;

  const query = `
    SELECT *
    FROM allenatori
    WHERE id = ?
  `;

  db.get(query, [id], (err, row) => {
    if (err) {
      console.error('Errore:', err.message);
      return res.status(500).json({ error: 'Errore nel database' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Allenatore non trovato' });
    }
    res.json(row);
  });
});
module.exports = router;
