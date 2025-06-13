const express = require('express');
const router = express.Router();
const db = require('../db');

// Salva feedback
router.post('/', (req, res) => {
  const { nome, email, messaggio } = req.body;
  db.run(
    'INSERT INTO feedback (nome, email, messaggio, data_invio) VALUES (?, ?, ?, datetime("now", "localtime"))',
    [nome, email, messaggio],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// Ottieni tutti i feedback (solo admin!)
router.get('/', (req, res) => {
  db.all('SELECT * FROM feedback ORDER BY data_invio DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;