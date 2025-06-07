const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../databaseElite/db');
const router = express.Router();

const JWT_SECRET = 'elitefussball';

// REGISTRAZIONE

function isPasswordValid(password) {
  // Min 8 caratteri, almeno una maiuscola, un numero e un carattere speciale
  return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/.test(password);
}

function isEmailValid(email) {
  // Regex per email valida standard
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  console.log('Dati ricevuti:', req.body);

  // Validazione email lato backend
  if (!isEmailValid(email)) {
    return res.status(400).json({
      message: 'Inserisci un indirizzo email valido.'
    });
  }

  // Validazione password lato backend
  if (!isPasswordValid(password)) {
    return res.status(400).json({
      message: 'La password deve essere lunga almeno 8 caratteri, contenere almeno una maiuscola, un numero e un carattere speciale.'
    });
  }

  db.get('SELECT * FROM utenti WHERE email = ?', [email], async (err, user) => {
    if (err) return res.status(500).json({ message: 'Errore database' });

    if (user) return res.status(400).json({ message: 'Utente già registrato' });

    const hashed = await bcrypt.hash(password, 10);

    db.run('INSERT INTO utenti (email, password) VALUES (?, ?)', [email, hashed], function(err2) {
      if (err2) return res.status(500).json({ message: 'Errore durante la registrazione' });

      res.status(201).json({ message: 'Registrazione completata' });
    });
  });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM utenti WHERE email = ?', [email], async (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'Credenziali errate' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Credenziali errate' });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;
