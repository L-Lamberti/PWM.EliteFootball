/*const express = require('express');
const db = require('../databaseElite/db');
const router = express.Router();

router.get('/top/:ruolo', (req, res) => {
  const ruolo = req.params.ruolo;

  const giocatori = db.prepare(
    'SELECT * FROM giocatori WHERE ruolo = ? ORDER BY voto DESC LIMIT 10'
  ).all(ruolo);

  res.json(giocatori);

});

module.exports = router;
jj*/

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

  db.all(query, [ruoloCodice], (err, rows) => {
    if (err) {
      console.error('Errore:', err.message);
      return res.status(500).json({ error: 'Errore nel database' });
    }
    res.json(rows);
  });
});

/*router.get('/top/:ruolo', (req, res) => {
  const ruolo = req.params.ruolo.trim();

  const query = `
    SELECT g.*, GROUP_CONCAT(r.codice) as ruoli
    FROM giocatori g
    JOIN giocatori_ruoli gr ON g.id = gr.giocatore_id
    JOIN ruoli r ON gr.ruolo_id = r.id
    WHERE g.id IN (
      SELECT giocatore_id
      FROM giocatori_ruoli
      WHERE ruolo_id = (SELECT id FROM ruoli WHERE codice = ?)
    )
    GROUP BY g.id
    ORDER BY g.voto DESC
    LIMIT 10
  `;

  db.all(query, [ruolo], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Errore nel database' });

    // Trasforma ruoli da stringa a array
    rows.forEach(row => {
      row.ruoli = row.ruoli.split(',');
    });

    res.json(rows);
  });
});*/

  /*db.all(
    'SELECT * FROM giocatori WHERE ruolo = ? ORDER BY voto DESC LIMIT 10',
    [ruolo],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Errore nel database' });
      }
      console.log('✅ Giocatori trovati:', rows);
      res.json(rows);
    }
  );*/


router.get('/:id', (req, res) => {
  const id = req.params.id;

   const queryGiocatore = `SELECT * FROM giocatori WHERE id = ?`;

   const queryRuoli = `
    SELECT r.codice, r.nome
    FROM ruoli r
    JOIN giocatori_ruoli gr ON r.id = gr.ruolo_id
    WHERE gr.giocatore_id = ?
  `;
  
  db.get(queryGiocatore, [id], (err, giocatore) => {
    if (err || !giocatore) return res.status(404).json({ error: 'Giocatore non trovato' });

    db.all(queryRuoli, [id], (err, ruoli) => {
      if (err) return res.status(500).json({ error: 'Errore nel database' });
      giocatore.ruoli = ruoli;
      res.json(giocatore);
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


module.exports = router;

