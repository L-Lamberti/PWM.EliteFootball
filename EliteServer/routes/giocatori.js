
const express = require('express');
const db = require('../databaseElite/db');
const router = express.Router();

router.get('/top/:ruolo', (req, res) => {
  const ruoloCodice = req.params.ruolo.trim();

  const query = `
    SELECT g.*
    FROM giocatori g
    JOIN giocatori_ruoli gr ON g.id = gr.giocatore_id
    JOIN ruoli r ON gr.ruolo_id = r.id
    WHERE r.codice = ?
    ORDER BY g.voto DESC
    LIMIT 10
  `;

  db.all(query, [ruoloCodice], (err, giocatori) => {
    if (err) {
      console.error('Errore:', err.message);
      return res.status(500).json({ error: 'Errore nel database' });
    }

    // Per ogni giocatore, prendi i suoi ruoli
    const promises = giocatori.map(g => {
      return new Promise((resolve, reject) => {
        const ruoliQuery = `
          SELECT r.codice
          FROM ruoli r
          JOIN giocatori_ruoli gr ON r.id = gr.ruolo_id
          WHERE gr.giocatore_id = ?
        `;
        db.all(ruoliQuery, [g.id], (err, ruoli) => {
          if (err) return reject(err);
          g.ruoli = ruoli.map(r => r.codice);
          resolve(g);
        });
      });
    });

    Promise.all(promises)
      .then(giocatoriConRuoli => res.json(giocatoriConRuoli))
      .catch(e => {
        console.error(e.message);
        res.status(500).json({ error: 'Errore durante l\'aggregazione dei ruoli' });
      });
  });
});

  
router.get('/:id/ruoli', (req, res) => {
  const id = req.params.id;
  const query = `
    SELECT r.codice, r.nome
    FROM ruoli r
    JOIN giocatori_ruoli gr ON r.id = gr.ruolo_id
    WHERE gr.giocatore_id = ?
  `;
  db.all(query, [id], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Errore nel database' });
    }
    res.json(rows);
  });
});
router.get('/', (req, res) => {
  const query = `SELECT * FROM giocatori ORDER BY voto DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Errore:', err.message);
      return res.status(500).json({ error: 'Errore nel database' });
    }
    res.json(rows);
  });
});

module.exports = router;

