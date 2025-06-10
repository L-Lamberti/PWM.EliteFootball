const db = require('./db');

db.all('SELECT id, nome, cognome, ruolo FROM giocatori', [], (err, rows) => {
  if (err) {
    console.error('❌ Errore DB:', err.message);
    return;
  }

  console.log('📋 Giocatori presenti nel database:');
  if (rows.length === 0) {
    console.log('⚠️ Nessun giocatore trovato.');
  } else {
    rows.forEach(row => {
      console.log(`- ${row.id}: ${row.nome} ${row.cognome} (${row.ruolo})`);
    });
  }
});
