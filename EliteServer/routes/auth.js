const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../databaseElite/db');
const router = express.Router();

const JWT_SECRET = 'elitefussball';

// REGISTRAZIONE
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare('SELECT * FROM utenti WHERE email = ?').get(email);
  if (user) return res.status(400).json({ message: 'Utente già registrato' });

  const hashed = await bcrypt.hash(password, 10);
  db.prepare('INSERT INTO utenti (email, password) VALUES (?, ?)').run(email, hashed);
  res.status(201).json({ message: 'Registrazione completata' });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = db.prepare('SELECT * FROM utenti WHERE email = ?').get(email);
  if (!user) return res.status(401).json({ message: 'Credenziali errate' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Credenziali errate' });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
