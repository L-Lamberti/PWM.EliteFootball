const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('elitefootball.db');

// Creazione tabelle
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS utenti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'user'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS giocatori (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    cognome TEXT,
    eta INTEGER,
    descrizione TEXT,
    voto REAL,
    foto TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS allenatori (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    cognome TEXT,
    eta INTEGER,
    descrizione TEXT,
    voto REAL,
    foto TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS ruoli (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codice TEXT UNIQUE,
  nome TEXT
)`);


  db.run(`CREATE TABLE IF NOT EXISTS citazioni (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    testo TEXT,
    autore TEXT,
    foto TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS giocatori_ruoli (
    giocatore_id INTEGER,
    ruolo_id INTEGER,
    PRIMARY KEY (giocatore_id, ruolo_id),
    FOREIGN KEY (giocatore_id) REFERENCES giocatori(id),
    FOREIGN KEY (ruolo_id) REFERENCES ruoli(id)
  )`);

db.run(`CREATE TABLE IF NOT EXISTS formazioni (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    nome TEXT,
    modulo TEXT,
    giocatori TEXT, -- JSON string con gli ID dei giocatori
    allenatoreId INTEGER, -- id dell'allenatore selezionato
    data_creazione DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES utenti(id)
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS quiz (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  domanda TEXT NOT NULL,
  risposta_corretta TEXT NOT NULL,
  risposta_errata1 TEXT NOT NULL,
  risposta_errata2 TEXT NOT NULL,
  risposta_errata3 TEXT NOT NULL
)`)

  db.run(`CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  email TEXT,
  messaggio TEXT NOT NULL,
  data_invio DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT,
  email TEXT,
  messaggio TEXT NOT NULL,
  data_invio DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

});

module.exports = db;