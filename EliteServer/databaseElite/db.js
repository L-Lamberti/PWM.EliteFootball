/*const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('elitefootball.db');

// Crea la tabella utenti (una tantum)
db.prepare(`
  CREATE TABLE IF NOT EXISTS utenti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  );
`).run();

module.exports = db;

db.prepare(`
  CREATE TABLE IF NOT EXISTS giocatori (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    cognome TEXT,
    eta INTEGER,
    ruolo TEXT,
    descrizione TEXT,
    voto REAL
  );
`).run();
*/

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('elitefootball.db');

// Creazione tabelle
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS utenti (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS giocatori (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    cognome TEXT,
    eta INTEGER,
    descrizione TEXT,
    voto REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS allenatori (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    cognome TEXT,
    eta INTEGER,
    descrizione TEXT,
    voto REAL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS ruoli (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  codice TEXT UNIQUE,
  nome TEXT
)`);


  db.run(`CREATE TABLE IF NOT EXISTS citazioni (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    testo TEXT,
    foto TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS giocatori_ruoli (
    giocatore_id INTEGER,
    ruolo_id INTEGER,
    PRIMARY KEY (giocatore_id, ruolo_id),
    FOREIGN KEY (giocatore_id) REFERENCES giocatori(id),
    FOREIGN KEY (ruolo_id) REFERENCES ruoli(id)
  )`);

});

module.exports = db;

