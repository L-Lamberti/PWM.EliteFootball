const express = require('express');
const db = require('../databaseElite/db');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'elitefussball';

// Middleware per autenticazione
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Crea una nuova formazione
router.post('/', authenticateToken, (req, res) => {
  const { nome, modulo, giocatori } = req.body;
  const userId = req.user.userId;
  if (!modulo || !giocatori) {
    return res.status(400).json({ message: 'Dati mancanti' });
  }
  db.run(
    `INSERT INTO formazioni (user_id, nome, modulo, giocatori) VALUES (?, ?, ?, ?)`,
    [userId, nome || null, modulo, JSON.stringify(giocatori)],
    function(err) {
      if (err) return res.status(500).json({ message: 'Errore database' });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Prendi tutte le formazioni dell’utente loggato
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  db.all(
    `SELECT * FROM formazioni WHERE user_id = ? ORDER BY data_creazione DESC`,
    [userId],
    (err, rows) => {
      if (err) return res.status(500).json({ message: 'Errore database' });
      // Decodifica i giocatori per ogni formazione
      rows.forEach(f => f.giocatori = JSON.parse(f.giocatori));
      res.json(rows);
    }
  );
});

// Modifica formazione
router.put('/:id', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const formazioneId = req.params.id;
  const { nome, modulo, giocatori } = req.body;

  db.run(
    `UPDATE formazioni SET nome = ?, modulo = ?, giocatori = ? WHERE id = ? AND user_id = ?`,
    [nome, modulo, JSON.stringify(giocatori), formazioneId, userId],
    function(err) {
      if (err) return res.status(500).json({ message: 'Errore database' });
      if (this.changes === 0) return res.status(404).json({ message: 'Formazione non trovata' });
      res.json({ message: 'Formazione aggiornata' });
    }
  );
});

// Elimina formazione
router.delete('/:id', authenticateToken, (req, res) => {
  const userId = req.user.userId;
  const formazioneId = req.params.id;
  db.run(
    `DELETE FROM formazioni WHERE id = ? AND user_id = ?`,
    [formazioneId, userId],
    function(err) {
      if (err) return res.status(500).json({ message: 'Errore database' });
      if (this.changes === 0) return res.status(404).json({ message: 'Formazione non trovata' });
      res.json({ message: 'Formazione eliminata' });
    }
  );
});

module.exports = router;