const db = require('./databaseElite/db');


function seedGiocatori() {
  
   db.prepare(`DELETE FROM giocatori_ruoli`).run();
  db.prepare(`DELETE FROM giocatori`).run();
  db.prepare(`DELETE FROM ruoli`).run();

  const stmt = db.prepare(`
  INSERT INTO giocatori (nome, cognome, eta, descrizione, voto)
  VALUES (?, ?, ?, ?, ?)
`);

const giocatori = [
  ['Lionel', 'Messi', 36, 'Genio del dribbling e visione unica', 9.8],
  ['Kylian', 'Mbappé', 25, 'Velocità esplosiva e finalizzazione', 9.5],
  ['Erling', 'Haaland', 24, 'Potenza fisica e fiuto del gol', 9.6],
  ['Kevin', 'De Bruyne', 33, 'Maestro degli assist e leader tecnico', 9.4],
  ['Luka', 'Modric', 38, 'Regista esperto e instancabile', 9.2],
  ['N\'Golo', 'Kanté', 33, 'Recupera ogni pallone', 9.0],
  ['Virgil', 'van Dijk', 33, 'Dominante nel gioco aereo', 9.3],
  ['Ruben', 'Dias', 28, 'Difensore solido e tattico', 9.0],
  ['Thibaut', 'Courtois', 32, 'Portiere reattivo e affidabile', 9.4],
  ['Jan', 'Oblak', 32, 'Sicurezza tra i pali', 9.2],
  ['Federico', 'diMarco', 28, 'Esterno con piede educato per i cross', 8.5]
];


  for (const g of giocatori) {
    stmt.run(...g);
  }

  console.log('✅ Giocatori inseriti.');
}

function seedRuoli() {
  const ruoli = [
    ['PC', 'Punta Centrale'],
    ['AD', 'Ala Destra'],
    ['AS', 'Ala Sinistra'],
    ['COC', 'Centrocampista Offensivo'],
    ['CC', 'Centrocampista Centrale'],
    ['CDC', 'Centrocampista Difensivo'],
    ['DC', 'Difensore Centrale'],
    ['TS', 'Terzino Sinistro'],
    ['TD', 'Terzino Destro'],
    ['POR', 'Portiere'],
    ['ED', 'Esterno Destro'],
    ['ES', 'Esterno Sinistro'],
    ['SP', 'Seconda Punta']
  ];

  const stmt = db.prepare(`INSERT INTO ruoli (codice, nome) VALUES (?, ?)`);
  for (const r of ruoli) stmt.run(...r);
  console.log('✅ Ruoli inseriti.');
}


function seedGiocatoriRuoli() {
  const ruoloMap = {}; // codice -> id
  db.all(`SELECT id, codice FROM ruoli`, [], (err, rows) => {
    if (err) throw err;
    rows.forEach(r => ruoloMap[r.codice] = r.id);

    const stmt = db.prepare(`INSERT INTO giocatori_ruoli (giocatore_id, ruolo_id) VALUES (?, ?)`);
    
    const mapping = [
      { nome: 'Messi', ruoli: ['AD', 'COC' , 'SP'] },
      { nome: 'Mbappé', ruoli: ['PC', 'AD'] },
      { nome: 'Haaland', ruoli: ['PC'] },
      { nome: 'De Bruyne', ruoli: ['COC', 'CC'] },
      { nome: 'Modric', ruoli: ['CC' , 'CDC'] },
      { nome: 'Kanté', ruoli: ['CDC' , 'CC'] },
      { nome: 'van Dijk', ruoli: ['DC'] },
      { nome: 'Dias', ruoli: ['DC'] },
      { nome: 'Courtois', ruoli: ['POR'] },
      { nome: 'Oblak', ruoli: ['POR'] },
      { nome: 'diMarco', ruoli: ['ES' , 'TS' ] }
    ];

    db.all(`SELECT id, cognome FROM giocatori`, [], (err, giocatori) => {
      if (err) throw err;

      for (const { nome, ruoli } of mapping) {
        const giocatore = giocatori.find(g => g.nome === nome);
        if (!giocatore) continue;
        for (const r of ruoli) {
          stmt.run(giocatore.id, ruoloMap[r]);
        }
      }
      console.log('✅ Mappatura giocatori-ruoli completata.');
    });
  });
}



function seedAllenatori() {
  const stmt = db.prepare(`
    INSERT INTO allenatori (nome, cognome, eta, descrizione, voto)
    VALUES (?, ?, ?, ?, ?)
  `);

  const allenatori = [
    ['Pep', 'Guardiola', 53, 'Maestro del possesso palla', 9.7],
    ['Carlo', 'Ancelotti', 65, 'Leader esperto e vincente', 9.6],
    ['Jürgen', 'Klopp', 57, 'Motivatore e tattico aggressivo', 9.5]
  ];

  for (const a of allenatori) {
    stmt.run(...a);
  }

  console.log('✅ Allenatori inseriti.');
}

function seedCitazioni() {
  const stmt = db.prepare(`
    INSERT INTO citazioni (testo, foto)
    VALUES (?, ?)
  `);

  const citazioni = [
    ['Il calcio è semplice. Ma è difficile giocare semplice. - Cruijff', 'cruijff.jpg'],
    ['Il calcio è larte di comprimere la storia in 90 minuti. -Pasolini', 'pasolini.jpg'],
    ['Giocare contro di lui è come giocare contro 11. - Ferguson su Messi', 'ferguson.jpg']
  ];

  for (const c of citazioni) {
    stmt.run(...c);
  }

  console.log('✅ Citazioni inserite.');
}

seedGiocatori();
seedAllenatori();
seedCitazioni();
seedRuoli();
setTimeout(seedGiocatoriRuoli, 500); // delay per sicurezza
