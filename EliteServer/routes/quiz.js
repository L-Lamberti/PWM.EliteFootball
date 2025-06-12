const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('', (req, res) => {
  const sql = `SELECT id, domanda, risposta_corretta, risposta_errata1, risposta_errata2, risposta_errata3 FROM quiz ORDER BY RANDOM() LIMIT 5`;

  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const formatted = rows.map(q => {
      const risposte = [
        q.risposta_corretta,
        q.risposta_errata1,
        q.risposta_errata2,
        q.risposta_errata3,
      ];

      // Mischia le risposte
      const shuffle = risposte
        .map(r => ({ text: r, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort);

      const correttaIndex = shuffle.findIndex(r => r.text === q.risposta_corretta);

      return {
        testo: q.domanda,
        risposte: shuffle.map(r => r.text),
        corretta: correttaIndex,
      };
    });

    res.json(formatted);
  });
});

module.exports = router;
