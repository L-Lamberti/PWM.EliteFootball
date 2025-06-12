const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const db = new sqlite3.Database('elitefootball.db');

function runAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function allAsync(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

async function seedGiocatori() {
  await runAsync(`DELETE FROM giocatori_ruoli`);
  await runAsync(`DELETE FROM giocatori`);
  
  const giocatori = [

    // PORTIERI (POR)

    ['Gianluigi', 'Donnarumma', 26, 'Portiere titolare del PSG e della Nazionale italiana. Dotato di grande reattività e presenza fisica, è capace di parate decisive nei momenti cruciali. Nonostante qualche errore in uscita, il suo rendimento generale resta molto alto.', 9.5, 'Gianluigi_Donnarumma.jpg'],
    ['Yann', 'Sommer', 36, 'Esperienza e affidabilità definiscono Sommer, portiere dell’Inter e colonna portante della Svizzera. Mantiene riflessi notevoli e un eccellente posizionamento. Ha guidato la difesa nerazzurra verso un’altra stagione solida.', 8.8, 'Yann_Sommer.jpg'],
    ['Stanislav', 'Agkatsev', 25, 'Portiere emergente del FK Krasnodar, ha stupito per maturità e rendimento costante. Abile nel gioco con i piedi e nelle uscite basse. Candidato a un futuro in una big europea.', 8.7, 'Stanislav_Agkatsev.jpg'],
    ['Mark', 'Flekken', 30, 'Portiere del Brentford e della Nazionale olandese, si distingue per il grande numero di parate in Premier League. Gioca spesso sotto pressione ma risponde con prestazioni solide. Decisivo anche nei momenti più difficili.', 8.5, 'Mark_Flekken.jpg'],
    ['Robert', 'Sánchez', 26, 'Portiere del Chelsea, alterna buone prestazioni a errori di concentrazione. Ha un ottimo potenziale atletico e riflessi sopra la media. Se migliora in continuità, può diventare un top assoluto.', 8.0, 'Robert_Sánchez.jpg'],
    ['Peter', 'Gulácsi', 34, 'Veterano del RB Leipzig e leader della nazionale ungherese. Solido nelle uscite e bravo nel guidare la difesa. Nonostante l’età, rimane competitivo e affidabile.', 8.3, 'Péter_Gulácsi.jpg'],
    ['João', 'Ricardo', 36, 'Portiere del Fortaleza, tra i migliori del campionato brasiliano. Grande leadership, esperienza e continuità di rendimento. Ancora decisivo anche a 36 anni.', 8.1, 'João_Ricardo.jpg'],
    ['Alisson', 'Becker', 32, 'Portiere del Liverpool e della Nazionale brasiliana. Forte tra i pali, abile con i piedi, carismatico. Qualche infortunio ha limitato la sua stagione, ma resta tra i migliori.', 8.6, 'Alisson_Becker.jpg'],
    ['Diogo', 'Costa', 25, 'Portiere del Porto e della Nazionale portoghese, è in rapida ascesa. Specialista nei rigori e molto bravo nel gioco moderno con i piedi. Ha un grande futuro davanti a sé.', 8.4, 'Diogo_Costa.jpg'],
    ['David', 'Raya', 29, 'Portiere spagnolo dell’Arsenal, eccellente nel gioco con i piedi e nella lettura delle situazioni. Ha vinto il Golden Glove alla sua prima stagione da titolare in Premier League.', 8.5, 'David_Raya.jpg'],
    ['Gregor', 'Kobel', 27, 'Solido portiere svizzero del Borussia Dortmund, affidabile tra i pali e dotato di grande presenza fisica. Punto fermo della difesa tedesca.', 8.5, 'Gregor_Kobel.jpg'],
    ['Guglielmo', 'Vicario', 28, 'Portiere italiano in forza al Tottenham. Reattivo, coraggioso e dotato di ottimo tempismo nelle uscite. Tra le rivelazioni in Premier League.', 8.0, 'Guglielmo_Vicario.jpg'],
    ['Giorgi', 'Mamardashvili', 24, 'Portiere georgiano di grande statura e riflessi. Ha impressionato a Valencia e si appresta a un salto di qualità con il trasferimento al Liverpool.', 8.5, 'Giorgi_Mamardashvili.jpg'],
    ['Lucas', 'Chevalier', 23, 'Talento emergente francese del Lille. Bravo tra i pali e promettente nella gestione della palla. Futuro interessante.', 7.5, 'Lucas_Chevalier.jpg'],
    ['Unai', 'Simon', 27, 'Portiere titolare della Spagna e dell’Athletic Bilbao. Solido, con buon posizionamento e capacità di gestire la pressione.', 8.5, 'Unai_Simon.jpg'],
    ['Ederson', 'Moraes', 31, 'Numero uno del Manchester City. Riconosciuto per l’eccellente impostazione da dietro e la freddezza. Una garanzia moderna.', 9.0, 'Ederson_Moraes.jpg'],
    ['Mile', 'Svilar', 25, 'Giovane portiere serbo della Roma. Tecnico e reattivo, ha mostrato spunti interessanti nelle coppe europee.', 7.5, 'Mile_Svilar.jpg'],
    ['Emiliano', 'Martinez', 32, 'Eroe del Mondiale 2022 con l’Argentina. Portiere del Villa, carismatico e bravo nei rigori. Leader dello spogliatoio.', 8.5, 'Emiliano_Martinez.jpg'],
    ['Marco', 'Carnesecchi', 24, 'Promettente portiere italiano dell’Atalanta. Reattivo, ben posizionato e affidabile, si candida per il futuro azzurro.', 7.5, 'Marco_Carnesecchi.jpg'],
    ['Bart', 'Verbruggen', 21, 'Portiere olandese del Brighton. Alto e agile, ha mostrato buona crescita e margini di sviluppo.', 7.5, 'Bart_Verbruggen.jpg'],
    ['Marc-Andre', 'Ter Stegen', 33, 'Veterano tedesco del Barcellona. Esperto, con ottima tecnica e riflessi, è ancora un riferimento tra i pali.', 8.5, 'Marc-Andre_Ter Stegen.jpg'],
    ['Mike', 'Maignan', 29, 'Portiere francese del Milan, completo e carismatico. Grande senso della posizione e riflessi fulminei.', 9.0, 'Mike_Maignan.jpg'],
    ['Thibaut', 'Courtois', 32, 'Portiere belga riconosciuto per la sua straordinaria reattività, sicurezza nelle uscite e capacità di compiere parate decisive nei momenti chiave. Ha vinto numerosi titoli nazionali e internazionali risultando spesso determinante nelle finali.', 9.4, 'Thibaut_Courtois.jpg'],
    ['Jan', 'Oblak', 32, 'Portiere sloveno dell\'Atletico Madrid, considerato uno dei migliori nel suo ruolo per riflessi eccezionali, posizionamento impeccabile e leadership difensiva, capace di mantenere la porta inviolata anche contro i migliori attaccanti del mondo.', 9.2, 'Jan_Oblak.jpg'],

    // TERZINI DESTRI (TD)

    ['Achraf', 'Hakimi', 26, 'Terzino destro del Paris Saint-Germain e della nazionale marocchina, noto per la sua velocità, abilità difensiva e capacità nei calci piazzati. Ha fornito 20 contributi offensivi nella stagione 2024-25, dimostrando di essere uno dei migliori nel suo ruolo.', 9.5, 'Achraf_Hakimi.jpg'],
    ['Trent', 'Alexander-Arnold', 26, 'Giocatore del Liverpool e della nazionale inglese, famoso per la sua visione di gioco e precisione nei cross. Nonostante alcune critiche difensive, continua a essere un punto di riferimento per la sua creatività e contributo offensivo.', 9.3, 'Trent_Alexander-Arnold.jpg'],
    ['Jeremie', 'Frimpong', 24, 'Terzino destro del Bayer Leverkusen e della nazionale olandese, apprezzato per la sua velocità, dribbling e capacità offensiva. Ha segnato 23 gol in 133 presenze con il club, consolidando la sua reputazione come uno dei migliori nel suo ruolo.', 9.0, 'Jeremie_Frimpong.jpg'],
    ['Jules', 'Koundé', 26, 'Difensore del Barcellona e della nazionale francese, inizialmente centrale ma adattato con successo come terzino destro. Ha fornito 7 assist nella stagione 2024-25, mostrando versatilità e affidabilità difensiva.', 8.9, 'Jules_Koundé.jpg'],
    ['Pedro', 'Porro', 25, 'Giocatore del Tottenham Hotspur e della nazionale spagnola, noto per la sua propensione offensiva e capacità di cross. Ha contribuito significativamente all\'attacco della sua squadra, dimostrando flessibilità tattica.', 8.7, 'Pedro_Porro.jpg'],
    ['Denzel', 'Dumfries', 29, 'Terzino destro dell’Inter e della nazionale olandese, riconosciuto per la sua forza fisica e capacità di supportare l\'attacco. Ha mantenuto prestazioni costanti sia in Serie A che a livello internazionale.', 8.6, 'Denzel_Dumfries.jpg'],
    ['Reece', 'James', 25, 'Capitano del Chelsea e membro della nazionale inglese, apprezzato per la sua solidità difensiva e capacità di contribuire all\'attacco. Nonostante alcuni infortuni, rimane uno dei terzini più completi.', 8.5, 'Reece_James.jpg'],
    ['Jurrien', 'Timber', 23, 'Difensore dell’Arsenal e della nazionale olandese, versatile e capace di giocare in più ruoli difensivi. Dopo un infortunio, è tornato con prestazioni impressionanti, dimostrando maturità e abilità tattica.', 8.4, 'Jurrien_Timber.jpg'],
    ['Sacha', 'Boey', 24, 'Terzino destro del Bayern Monaco, noto per la sua velocità e capacità difensiva. Dopo il trasferimento dal Galatasaray, ha continuato a mostrare solidità e affidabilità nel campionato tedesco.', 8.3, 'Sacha_Boey.jpg'],
    ['Diogo', 'Dalot', 26, 'Giocatore del Manchester United e della nazionale portoghese, apprezzato per la sua versatilità e contributo sia in difesa che in attacco. Ha mantenuto un livello costante di prestazioni nella Premier League.', 8.2, 'Diogo_Dalot.jpg'],
    ['Tino', 'Livramento', 22, 'Difensore inglese del Newcastle United, noto per la sua velocità e capacità di sovrapposizione sulla fascia destra. Ha attirato l\'attenzione di club di alto livello.', 8.0, 'Tino_Livramento.jpg'],
    ['Domilson', 'Cordeiro dos Santos', 26, 'Conosciuto come Dodô, terzino destro brasiliano della Fiorentina. Apprezzato per la sua agilità e abilità nel dribbling, contribuisce sia in fase difensiva che offensiva.', 7.5, 'Domilson_Cordeiro dos Santos.jpg'],
    ['João', 'Cancelo', 30, 'Difensore portoghese dell\'Al-Hilal, versatile e tecnico, capace di giocare su entrambe le fasce. Ha esperienza in top club europei.', 8.5, 'João_Cancelo.jpg'],
    ['Daniel', 'Carvajal', 33, 'Esperto terzino destro spagnolo del Real Madrid, noto per la sua solidità difensiva e capacità di supportare l\'attacco. Ha affrontato una grave lesione nel 2024, ma è tornato a competere ad alto livello.', 8.0, 'Daniel_Carvajal.jpg'],
    ['Nahuel', 'Molina', 27, 'Difensore argentino dell\'Atlético Madrid, apprezzato per la sua velocità e capacità di cross. Ha contribuito al successo dell\'Argentina nel Mondiale 2022.', 8.0, 'Nahuel_Molina.jpg'],
    ['Ben', 'White', 27, 'Difensore inglese dell\'Arsenal, versatile e solido, capace di giocare sia come terzino destro che come centrale. Ha mostrato costanza nelle sue prestazioni.', 8.5, 'Ben_White.jpg'],
    ['Rico', 'Lewis', 20, 'Giovane talento inglese del Manchester City, noto per la sua maturità tattica e abilità difensive. Ha impressionato sotto la guida di Pep Guardiola.', 7.5, 'Rico_Lewis.jpg'],
    ['Giovanni', 'Di Lorenzo', 31, 'Capitano del Napoli e terzino destro italiano, riconosciuto per la sua leadership, solidità difensiva e contributo offensivo. Pilastro della squadra partenopea.', 8.5, 'Giovanni_Di Lorenzo.jpg'],
    ['Konrad', 'Laimer', 28, 'Centrocampista austriaco del Bayern Monaco, adattato con successo al ruolo di terzino destro. Apprezzato per la sua versatilità, energia e capacità difensive.', 8.0, 'Konrad_Laimer.jpg'],

    // TERZINI SINISTRI (TS)

    ['Federico', 'Dimarco', 27, 'Terzino sinistro dell’Inter e della Nazionale italiana, Dimarco è noto per la sua precisione nei cross, intelligenza tattica e capacità di contribuire sia in fase difensiva che offensiva. Nella stagione 2024-25 ha registrato 14 assist e 7 gol, consolidando il suo ruolo chiave nella squadra.', 9.5, 'Federico_Dimarco.jpg'],
    ['Nuno', 'Mendes', 23, 'Giocatore del Paris Saint-Germain e della Nazionale portoghese, Mendes si distingue per la sua velocità, abilità nei cross e versatilità tattica. Con un tasso di successo nei cross del 91% e 64 intercettazioni nella stagione, è considerato uno dei migliori nel suo ruolo.', 9.3, 'Nuno_Mendes.jpg'],
    ['Alejandro', 'Balde', 22, 'Terzino sinistro del Barcellona e della Nazionale spagnola, Balde combina velocità e tecnica, contribuendo sia in difesa che in attacco. Nella stagione 2024-25 ha fornito 15 assist e effettuato 72 intercettazioni, mostrando una crescita costante.', 9.2, 'Alejandro_Balde.jpg'],
    ['Alphonso', 'Davies', 24, 'Giocatore del Bayern Monaco e della Nazionale canadese, Davies è rinomato per la sua velocità e capacità di dribbling. Nella stagione ha registrato un tasso di dribbling riusciti dell’87%, 11 assist e 4 gol, dimostrando la sua influenza su entrambe le fasce.', 9.1, 'Alphonso_Davies.jpg'],
    ['Theo', 'Hernandez', 27, 'Terzino sinistro del Milan e della Nazionale francese, Hernandez è apprezzato per la sua forza fisica e contributo offensivo. Con un tasso di successo nei tackle dell’85% e 16 contributi offensivi nella stagione, è un elemento fondamentale per la sua squadra.', 9.0, 'Theo_Hernandez.jpg'],
    ['Álex', 'Grimaldo', 29, 'Giocatore del Bayer Leverkusen e della Nazionale spagnola, Grimaldo ha avuto una stagione eccezionale con 3 gol e 7 assist. La sua abilità nei calci piazzati e nei cross lo rende una minaccia costante per le difese avversarie.', 8.9, 'Álex_Grimaldo.jpg'],
    ['Destiny', 'Udogie', 22, 'Terzino sinistro del Tottenham Hotspur e della Nazionale italiana, Udogie è noto per la sua energia e capacità di supportare l’attacco. Con 3.7 tackle e intercettazioni combinate per partita nella stagione, ha dimostrato solidità difensiva.', 8.7, 'Destiny_Udogie.jpg'],
    ['Antonee', 'Robinson', 27, 'Giocatore del Fulham e della Nazionale statunitense, Robinson è riconosciuto per la sua affidabilità difensiva e contributo offensivo. Nella stagione ha fornito 7 assist in 20 partite, attirando l’attenzione di club di alto livello.', 8.6, 'Antonee_Robinson.jpg'],
    ['Marc', 'Cucurella', 26, 'Terzino sinistro del Chelsea e della Nazionale spagnola, Cucurella ha migliorato significativamente le sue prestazioni, diventando titolare fisso. Ha contribuito con assist cruciali e ha mostrato solidità difensiva sotto la guida di Enzo Maresca.', 8.5, 'Marc_Cucurella.jpg'],
    ['Andrea', 'Cambiaso', 25, 'Terzino versatile della Juventus, capace di giocare su entrambe le fasce. Conosciuto per la sua resistenza, abilità difensive e contributo offensivo. Ha recentemente rinnovato il contratto fino al 2029.', 8.0, 'Andrea_Cambiaso.jpg'],
    ['Milos', 'Kerkez', 21, 'Terzino sinistro ungherese del Bournemouth, noto per la sua energia, velocità e capacità di supportare l\'attacco. Ha attirato l\'attenzione di club di alto livello grazie alle sue prestazioni in Premier League.', 8.0, 'Milos_Kerkez.jpg'],
    ['Riccardo', 'Calafiori', 23, 'Difensore italiano dell\'Arsenal, capace di giocare sia come centrale che come terzino sinistro. Apprezzato per la sua tecnica, visione di gioco e versatilità. Ha avuto un impatto positivo nella sua prima stagione in Premier League.', 8.5, 'Riccardo_Calafiori.jpg'],
    ['Álvaro', 'Carreras', 22, 'Terzino sinistro spagnolo del Benfica, con esperienza in vari club europei. Conosciuto per la sua abilità nel dribbling e nel supporto offensivo.', 7.5, 'Álvaro_Carreras.jpg'],
    ['Andrew', 'Robertson', 31, 'Esperto terzino sinistro scozzese del Liverpool, noto per la sua resistenza, precisione nei cross e contributo sia difensivo che offensivo. Pilastro della difesa del Liverpool.', 9.0, 'Andrew_Robertson.jpg'],
    ['Miguel', 'Gutiérrez', 23, 'Terzino sinistro spagnolo del Girona, formato nel Real Madrid. Apprezzato per la sua tecnica, visione di gioco e capacità di spinta sulla fascia. Ha attirato l\'interesse di club importanti.', 8.0, 'Miguel_Gutiérrez.jpg'],
    ['Ferdi', 'Kadıoğlu', 25, 'Giocatore turco-olandese del Brighton & Hove Albion, capace di ricoprire diversi ruoli tra cui terzino destro, sinistro e centrocampista. Versatile, tecnico e con buona visione di gioco.', 8.0, 'Ferdi_Kadıoğlu.jpg'],
    ['Jorrel', 'Hato', 19, 'Giovane difensore olandese dell\'Ajax, capace di giocare sia come centrale che come terzino sinistro. Nonostante la giovane età, ha già dimostrato maturità e solidità difensiva.', 7.5, 'Jorrel_Hato.jpg'],


	   // DIFENSORI CENTRALI (DC) 

    ['Rúben', 'Dias', 28, 'Difensore centrale del Manchester City e della nazionale portoghese, noto per la sua leadership, intelligenza tattica e robustezza difensiva. Perno della difesa del City, ha contribuito significativamente ai successi del club, inclusi i titoli nazionali e internazionali.', 9.5, 'Rúben_Dias.jpg'],
    ['William', 'Saliba', 24, 'Giocatore dell’Arsenal e della nazionale francese, Saliba si distingue per la sua compostezza sotto pressione e abilità nel leggere il gioco. Ha fortificato la retroguardia dei Gunners, contribuendo al miglior record difensivo della Premier League.', 9.4, 'William_Saliba.jpg'],
    ['Joško', 'Gvardiol', 23, 'Difensore del Manchester City e della nazionale croata, Gvardiol è apprezzato per la sua versatilità, capacità di impostare il gioco e solidità difensiva. Ha rapidamente guadagnato un ruolo chiave nella difesa del City.', 9.3, 'Joško_Gvardiol.jpg'],
    ['Antonio', 'Rüdiger', 32, 'Difensore del Real Madrid e della nazionale tedesca, Rüdiger è noto per la sua aggressività, velocità e abilità nei duelli aerei. Ha giocato un ruolo fondamentale nei successi recenti del Real Madrid, inclusa la vittoria della Champions League 2024.', 9.2, 'Antonio_Rüdiger.jpg'],
    ['Alessandro', 'Bastoni', 26, 'Giocatore dell’Inter e della nazionale italiana, Bastoni è riconosciuto per la sua capacità di impostare il gioco dalla difesa e la sua solidità difensiva. Ha contribuito ai successi dell’Inter, inclusi due campionati italiani e finali europee.', 9.1, 'Alessandro_Bastoni.jpg'],
    ['Gabriel', 'Magalhães', 27, 'Difensore dell’Arsenal e della nazionale brasiliana, Gabriel è apprezzato per la sua forza fisica, compostezza e abilità nei colpi di testa. Ha formato una solida coppia difensiva con Saliba, contribuendo al successo difensivo dell’Arsenal.', 9.0, 'Gabriel_Magalhães.jpg'],
    ['Virgil', 'van Dijk', 33, 'Capitano del Liverpool e della nazionale olandese, van Dijk è noto per la sua presenza imponente, velocità e calma sotto pressione. Ha guidato la difesa del Liverpool durante i loro trionfi in Premier League e Champions League.', 8.9, 'Virgil_van Dijk.jpg'],
    ['Kim', 'Min-jae', 28, 'Difensore del Bayern Monaco e della nazionale sudcoreana, Kim è riconosciuto per la sua forza fisica, velocità e abilità nei duelli difensivi. Ha avuto un impatto immediato nella difesa del Bayern dopo il suo trasferimento.', 8.8, 'Kim_Min-jae.jpg'],
    ['Leny', 'Yoro', 19, 'Giovane talento del Lille e della nazionale francese, Yoro si distingue per la sua maturità, capacità nei duelli e abilità nel gioco aereo. Considerato uno dei migliori giovani difensori in Europa, è seguito da diversi top club.', 8.7, 'Leny_Yoro.jpg'],
    ['Cristian', 'Romero', 27, 'Difensore del Tottenham Hotspur e della nazionale argentina, Romero è noto per la sua aggressività, capacità nei contrasti e leadership. È stato nominato Giocatore della Stagione della UEFA Europa League 2024-2025, contribuendo al successo europeo degli Spurs.', 8.6, 'Cristian_Romero.jpg'],
    ['Pau', 'Cubarsí', 18, 'Giovane difensore spagnolo del Barcellona, noto per la sua maturità tattica e abilità nell\'impostazione del gioco. Ha esordito in prima squadra a 17 anni, impressionando per le sue prestazioni solide.', 8.0, 'Pau_Cubarsí.jpg'],
    ['Ibrahima', 'Konaté', 26, 'Difensore centrale francese del Liverpool, apprezzato per la sua velocità, forza fisica e capacità di lettura del gioco. Ha contribuito significativamente alla solidità difensiva della squadra.', 8.5, 'Ibrahima_Konaté.jpg'],
    ['Micky', 'van de Ven', 24, 'Difensore olandese del Tottenham Hotspur, noto per la sua velocità e versatilità. Può giocare sia come centrale che come terzino sinistro, offrendo opzioni tattiche all\'allenatore.', 8.0, 'Micky_van de Ven.jpg'],
    ['Gleison', 'Bremer', 28, 'Difensore brasiliano della Juventus, riconosciuto per la sua forza fisica e abilità nei duelli aerei. È un pilastro della difesa bianconera.', 8.5, 'Gleison_Bremer.jpg'],
    ['Piero', 'Hincapié', 23, 'Difensore ecuadoriano del Bayer Leverkusen, apprezzato per la sua aggressività e capacità di anticipare gli avversari. Ha mostrato una crescita costante nel campionato tedesco.', 8.0, 'Piero_Hincapié.jpg'],
    ['Alessandro', 'Buongiorno', 26, 'Difensore italiano del Torino, noto per la sua solidità difensiva e leadership in campo. È considerato uno dei prospetti più interessanti del calcio italiano.', 8.0, 'Alessandro_Buongiorno.jpg'],
    ['Dean', 'Huijsen', 20, 'Giovane difensore olandese della Juventus, dotato di ottima tecnica e visione di gioco. Ha impressionato per la sua maturità nonostante la giovane età.', 7.5, 'Dean_Huijsen.jpg'],
    ['Sven', 'Botman', 25, 'Difensore olandese del Newcastle United, conosciuto per la sua imponente presenza fisica e abilità nel gioco aereo. Ha contribuito alla solidità difensiva della squadra inglese.', 8.5, 'Sven_Botman.jpg'],
    ['Marcos', 'Aoás Corrêa', 31, 'Conosciuto come Marquinhos, difensore brasiliano del Paris Saint-Germain. Leader carismatico, eccelle nella lettura del gioco e nella versatilità difensiva.', 9.0, 'Marcos_Aoás Corrêa.jpg'],
    ['Pau', 'Torres', 28, 'Difensore spagnolo del Villarreal, apprezzato per la sua eleganza e abilità nell\'impostare il gioco dalla difesa. Ha attirato l\'attenzione di molti top club europei.', 8.5, 'Pau_Torres.jpg'],
    ['Matthijs', 'de Ligt', 25, 'Difensore olandese del Bayern Monaco, noto per la sua forza fisica e leadership. Ha maturato esperienza in diversi top club europei.', 8.5, 'Matthijs_de Ligt.jpg'],
    ['Nico', 'Schlotterbeck', 26, 'Difensore tedesco del Borussia Dortmund, riconosciuto per la sua aggressività e capacità di intercettazione. È un elemento chiave nella difesa della sua squadra.', 8.0, 'Nico_Schlotterbeck.jpg'],
    ['Antonio', 'Rüdiger', 32, 'Difensore tedesco del Real Madrid, noto per la sua velocità, forza e determinazione. Ha esperienza ai massimi livelli europei.', 8.5, 'Antonio_Rüdiger.jpg'],
    
    // CENTROCAMPISTI DIFENSIVI CENTRALI (CDC)

    ['Rodri', 'Hernández', 28, 'Centrocampista del Manchester City e della nazionale spagnola, Rodri è noto per la sua intelligenza tattica, precisione nei passaggi e capacità di dettare i ritmi di gioco. Nonostante un infortunio che lo ha tenuto fuori per parte della stagione, rimane un punto di riferimento nel suo ruolo.', 9.5, 'Rodri_Hernández.jpg'],
    ['Declan', 'Rice', 26, 'Giocatore dell’Arsenal e della nazionale inglese, Rice combina forza fisica, abilità nei contrasti e visione di gioco. Ha avuto un impatto immediato dopo il suo trasferimento, diventando un elemento chiave nel centrocampo dei Gunners.', 9.3, 'Declan_Rice.jpg'],
    ['João', 'Palhinha', 29, 'Centrocampista del Bayern Monaco e della nazionale portoghese, Palhinha è apprezzato per la sua robustezza, capacità di recupero palla e presenza fisica. Ha portato equilibrio e solidità al centrocampo del Bayern.', 9.2, 'João_Palhinha.jpg'],
    ['Bruno', 'Guimarães', 27, 'Giocatore del Newcastle United e della nazionale brasiliana, Guimaraes si distingue per la sua versatilità, capacità di impostare il gioco e intensità. È diventato un leader nel centrocampo dei Magpies.', 9.1, 'Bruno_Guimarães.jpg'],
    ['Eduardo', 'Camavinga', 22, 'Centrocampista del Real Madrid e della nazionale francese, Camavinga è noto per la sua energia, abilità nei contrasti e capacità di avanzare con il pallone. Ha mostrato maturità e consistenza nonostante la giovane età.', 9.0, 'Eduardo_Camavinga.jpg'],
    ['Aurélien', 'Tchouaméni', 25, 'Giocatore del Real Madrid e della nazionale francese, Tchouameni è riconosciuto per la sua forza fisica, abilità nei duelli e capacità di coprire ampie porzioni di campo. Ha consolidato il suo ruolo nel centrocampo dei Blancos.', 8.9, 'Aurélien_Tchouaméni.jpg'],
    ['Martín', 'Zubimendi', 26, 'Centrocampista della Real Sociedad e della nazionale spagnola, Zubimendi è apprezzato per la sua intelligenza tattica, precisione nei passaggi e capacità di leggere il gioco. È considerato uno dei migliori interpreti del ruolo in Spagna.', 8.8, 'Martín_Zubimendi.jpg'],
    ['Hakan', 'Çalhanoğlu', 31, 'Giocatore dell’Inter e della nazionale turca, Calhanoglu ha adattato con successo il suo stile di gioco a un ruolo più arretrato, offrendo qualità nei passaggi e visione di gioco. Ha contribuito significativamente al successo dell’Inter.', 8.7, 'Hakan_Çalhanoğlu.jpg'],
    ['João', 'Neves', 20, 'Centrocampista del Paris Saint-Germain e della nazionale portoghese, Neves è un giovane talento emergente noto per la sua tecnica, visione di gioco e maturità tattica. Ha mostrato grande potenziale nel suo ruolo.', 8.6, 'João_Neves.jpg'],
    ['Ryan', 'Gravenberch', 23, 'Giocatore del Liverpool e della nazionale olandese, Gravenberch ha impressionato per la sua capacità di combinare forza fisica, tecnica e intelligenza tattica. Ha avuto un ruolo chiave nel centrocampo dei Reds.', 8.5, 'Ryan_Gravenberch.jpg'],
    ['Joshua', 'Kimmich', 30, 'Centrocampista tedesco del Bayern Monaco, noto per la sua versatilità e intelligenza tattica. Capace di giocare sia come mediano che come terzino destro, è apprezzato per la sua precisione nei passaggi e la leadership in campo. Ha recentemente esteso il suo contratto fino al 2029.', 9.0, 'Joshua_Kimmich.jpg'],
    ['Morten', 'Hjulmand', 25, 'Centrocampista danese dello Sporting CP, riconosciuto per la sua abilità nel recupero palla e nella distribuzione del gioco. Ha contribuito significativamente al successo dello Sporting nella Primeira Liga.', 8.0, 'Morten_Hjulmand-jpg.jpg'],
    ['Angelo', 'Stiller', 24, 'Centrocampista tedesco dell\'Hoffenheim, noto per la sua visione di gioco e capacità di dettare i tempi a centrocampo. Ha mostrato una crescita costante nella Bundesliga.', 7.5, 'Angelo_Stiller.jpg'],
    ['Marc', 'Casadó', 21, 'Giovane talento spagnolo del Barcellona, apprezzato per la sua versatilità e intelligenza tattica. Può giocare sia come mediano che come terzino destro, mostrando maturità oltre la sua età.', 7.5, 'Marc_Casadó.jpg'],
    ['Aleksandar', 'Pavlović', 21, 'Centrocampista tedesco del Bayern Monaco, noto per la sua tecnica e visione di gioco. Ha recentemente firmato un contratto professionistico fino al 2027 e ha impressionato nelle sue apparizioni in prima squadra.', 8.0, 'Aleksandar_Pavlović.jpg'],
    ['Moisés', 'Caicedo', 23, 'Centrocampista ecuadoriano del Chelsea, noto per la sua energia, abilità difensive e capacità di transizione. Ha attirato l\'attenzione per le sue prestazioni dinamiche in Premier League.', 8.5, 'Moisés_Caicedo.jpg'],
    ['Amadou', 'Onana', 23, 'Centrocampista belga dell\'Aston Villa, apprezzato per la sua presenza fisica e abilità nel recupero palla. Ha mostrato versatilità e adattabilità nel centrocampo.', 8.0, 'Amadou_Onana.jpg'],
    ['Carlos Henrique', 'Casemiro', 33, 'Conosciuto come Casemiro, centrocampista brasiliano del Manchester United, rinomato per la sua esperienza, abilità difensive e leadership. Ha una carriera decorata con numerosi titoli.', 9.0, 'Carlos Henrique_Casemiro.jpg'],
    ['Manuel', 'Locatelli', 27, 'Centrocampista italiano della Juventus, noto per la sua visione di gioco, abilità nei passaggi e contributo sia difensivo che offensivo. È un punto fermo nel centrocampo bianconero.', 8.5, 'Manuel_Locatelli.jpg'],
    ['N\'Golo', 'Kanté', 33, 'Centrocampista francese noto per la sua incredibile capacità di recupero palla, intelligenza tattica e generosità in campo. Ha vinto Premier League, Champions League e la Coppa del Mondo 2018 con la Francia, diventando un punto di riferimento per ogni squadra in cui ha giocato.', 9.0, 'NGolo_Kanté.jpg'],
    
    // CENTROCAMPISTI DIFENSIVI CENTRALI (CC)
    
    ['Jude', 'Bellingham', 21, 'Centrocampista del Real Madrid e della nazionale inglese, Bellingham è noto per la sua versatilità, capacità di segnare e creare occasioni. Nella stagione 2024-25 ha registrato 11 gol e 11 assist, contribuendo significativamente alla vittoria della Champions League da parte del Real Madrid. La sua maturità e leadership lo rendono uno dei migliori al mondo nel suo ruolo.', 9.7, 'Jude_Bellingham.jpg'],
    ['Federico', 'Valverde', 26, 'Giocatore del Real Madrid e della nazionale uruguaiana, Valverde è apprezzato per la sua versatilità, dinamismo e capacità di coprire ampie porzioni di campo. Ha giocato un ruolo chiave nel centrocampo del Real Madrid, contribuendo sia in fase difensiva che offensiva.', 9.5, 'Federico_Valverde.jpg'],
    ['Pedri', 'González', 22, 'Centrocampista del Barcellona e della nazionale spagnola, Pedri è noto per la sua visione di gioco, controllo palla e capacità di collegare difesa e attacco. Nonostante alcuni infortuni, ha continuato a essere un elemento fondamentale per il Barcellona.', 9.4, 'Pedri_González.jpg'],
    ['Gavi', 'Páez', 20, 'Centrocampista del Barcellona e della nazionale spagnola, Gavi è noto per la sua energia, aggressività e abilità nel recupero palla. Nonostante la giovane età, ha mostrato maturità e consistenza, diventando un punto fermo nel centrocampo del Barcellona.', 9.1, 'Gavi_Páez.jpg'],
    ['Alexis', 'Mac Allister', 26, 'Centrocampista argentino del Liverpool, noto per la sua versatilità e intelligenza tattica. Ha contribuito significativamente al successo del Liverpool in Premier League e Champions League.', 8.5, 'Alexis_Mac Allister.jpg'],
    ['Nicolò', 'Barella', 28, 'Centrocampista italiano dell\'Inter, apprezzato per la sua energia, visione di gioco e capacità di inserimento. Pilastro del centrocampo nerazzurro e della Nazionale italiana.', 9.0, 'Nicolò_Barella.jpg'],
    ['Enzo', 'Fernández', 24, 'Centrocampista argentino del Chelsea, noto per la sua abilità nei passaggi e nella gestione del gioco. Ha avuto un impatto significativo in Premier League.', 8.5, 'Enzo_Fernández.jpg'],
    ['Warren', 'Zaïre-Emery', 19, 'Giovane talento francese del Paris Saint-Germain, riconosciuto per la sua maturità tattica e capacità di recupero palla. Considerato uno dei prospetti più promettenti del calcio francese.', 8.0, 'Warren_Zaïre-Emery.jpg'],
    ['Vítor', 'Machado Ferreira', 25, 'Conosciuto come Vitinha, centrocampista portoghese del Paris Saint-Germain, apprezzato per la sua tecnica raffinata e visione di gioco. Ha consolidato il suo ruolo nel centrocampo parigino.', 8.0, 'Vítor_Machado Ferreira.jpg'],
    ['Éderson', 'José dos Santos Lourenço da Silva', 25, 'Centrocampista brasiliano dell\'Atalanta, noto per la sua forza fisica e capacità di inserimento offensivo. Ha contribuito al successo dell\'Atalanta in Serie A.', 8.0, 'Éderson_José dos Santos Lourenço da Silva.jpg'],
    ['Tijjani', 'Reijnders', 26, 'Centrocampista olandese del Milan, apprezzato per la sua dinamicità e qualità tecniche. Ha recentemente esteso il suo contratto fino al 2030.', 8.0, 'Tijjani_Reijnders.jpg'],
    ['Sandro', 'Tonali', 25, 'Centrocampista italiano del Newcastle United, noto per la sua visione di gioco e abilità nei passaggi. Ha avuto un impatto positivo in Premier League.', 8.5, 'Sandro_Tonali.jpg'],
    ['Frenkie', 'de Jong', 28, 'Centrocampista olandese del Barcellona, riconosciuto per la sua eleganza nel controllo palla e capacità di dettare i tempi di gioco. Pilastro del centrocampo blaugrana.', 9.0, 'Frenkie_de Jong.jpg'],
    ['Khéphren', 'Thuram', 24, 'Centrocampista francese della Juventus, noto per la sua fisicità e abilità nel recupero palla. Ha mostrato una crescita costante in Serie A.', 8.0, 'Khéphren_Thuram.jpg'],
    ['Scott', 'McTominay', 28, 'Centrocampista scozzese del Napoli, apprezzato per la sua versatilità e contributo sia difensivo che offensivo. Ha giocato un ruolo chiave nella vittoria dello Scudetto del Napoli.', 8.5, 'Scott_McTominay.jpg'],
    ['Fabián', 'Ruiz', 29, 'Centrocampista spagnolo del Paris Saint-Germain, noto per la sua tecnica raffinata e capacità di segnare dalla distanza. Ha consolidato il suo ruolo nel centrocampo parigino.', 8.0, 'Fabián_Ruiz.jpg'],
    ['Luka', 'Modric', 38, 'Centrocampista croato celebre per la sua visione di gioco, tecnica sopraffina e capacità di dettare i ritmi della partita. Pilastro del centrocampo madridista, ha vinto numerosi titoli tra cui cinque Champions League e il Pallone d\'Oro nel 2018. È considerato uno dei migliori registi della sua generazione.', 9.2, 'Luka_Modric.jpg'],

    // CENTROCAMPISTI OFFENSIVI CENTRALI (COC)

    ['Jamal', 'Musiala', 22, 'Giocatore del Bayern Monaco e della nazionale tedesca, Musiala è noto per la sua abilità nel dribbling, visione di gioco e capacità di creare occasioni. Nella stagione ha segnato 14 gol e fornito 5 assist, consolidando il suo ruolo chiave nel club e nella nazionale.', 9.5, 'Jamal_Musiala.jpg'],
    ['Florian', 'Wirtz', 22, 'Centrocampista del Bayer Leverkusen e della nazionale tedesca, Wirtz si distingue per la sua creatività e intelligenza tattica. Nella stagione ha registrato 14 gol e 9 assist, attirando l’interesse di top club europei come Liverpool e Bayern Monaco.', 9.4, 'Florian_Wirtz.jpg'],
    ['Martin', 'Ødegaard', 26, 'Capitano dell’Arsenal e della nazionale norvegese, Odegaard è apprezzato per la sua visione di gioco, controllo palla e capacità di segnare. Ha guidato l’Arsenal a una stagione di successo, contribuendo con gol e assist decisivi.', 9.3, 'Martin_Ødegaard.jpg'],
    ['Cole', 'Palmer', 23, 'Giocatore del Chelsea e della nazionale inglese, Palmer ha avuto una stagione eccezionale con 22 gol nella Premier League 2023-24. La sua capacità di segnare e creare occasioni lo rende uno dei talenti emergenti più promettenti.', 9.2, 'Cole_Palmer.jpg'],
    ['Kevin', 'De Bruyne', 33, 'Centrocampista del Manchester City e della nazionale belga, De Bruyne è noto per la sua visione di gioco, precisione nei passaggi e leadership. Nonostante l’età, continua a essere un elemento fondamentale per il City.', 9.1, 'Kevin_De Bruyne.jpg'],
    ['Bruno', 'Fernandes', 30, 'Giocatore del Manchester United e della nazionale portoghese, Fernandes è riconosciuto per la sua abilità nei calci piazzati, visione di gioco e capacità di segnare. Ha registrato 14 gol e 15 assist nella stagione 2022-23, dimostrando la sua importanza nel club.', 9.0, 'Bruno_Fernandes.jpg'],
    ['Phil', 'Foden', 25, 'Centrocampista del Manchester City e della nazionale inglese, Foden si distingue per la sua tecnica, agilità e capacità di creare occasioni. Ha continuato a crescere, diventando un elemento chiave nel centrocampo del City.', 8.9, 'Phil_Foden.jpg'],
    ['Dani', 'Olmo', 27, 'Giocatore del Barcellona e della nazionale spagnola, Olmo è apprezzato per la sua versatilità, creatività e capacità di segnare. Dopo esperienze con Dinamo Zagabria e Lipsia, è tornato al Barcellona, contribuendo significativamente al gioco offensivo della squadra.', 8.8, 'Dani_Olmo.jpg'],
    ['Antoine', 'Griezmann', 34, 'Centrocampista offensivo dell’Atlético Madrid e della nazionale francese, Griezmann è noto per la sua esperienza, visione di gioco e capacità di segnare. Ha registrato 16 assist e 31 contributi totali nella scorsa stagione, dimostrando di essere ancora un giocatore di alto livello.', 8.7, 'Antoine_Griezmann.jpg'],
    ['Dominik', 'Szoboszlai', 24, 'Centrocampista ungherese del Liverpool, noto per la sua versatilità, tecnica e capacità nei calci piazzati. Ha avuto un impatto significativo nella Premier League.', 8.5, 'Dominik_Szoboszlai.jpg'],
    ['Xavi', 'Simons', 22, 'Centrocampista offensivo olandese del RB Lipsia, apprezzato per la sua creatività, dribbling e visione di gioco. Ha recentemente firmato un contratto fino al 2027 con il club tedesco.', 8.5, 'Xavi_Simons.jpg'],
    ['Nicolás', 'Paz', 21, 'Conosciuto come Nico Paz, centrocampista argentino del Real Madrid, riconosciuto per la sua tecnica raffinata e visione di gioco. Dopo un prestito al Como, il Real Madrid ha intenzione di riportarlo in squadra.', 7.5, 'Nicolás_Paz.jpg'],
    ['Bernardo', 'Silva', 30, 'Centrocampista portoghese del Manchester City, versatile e intelligente tatticamente, capace di giocare in vari ruoli offensivi. Fondamentale nel sistema di gioco di Guardiola.', 9.0, 'Bernardo_Silva.jpg'],
    ['Fermín', 'López', 22, 'Centrocampista spagnolo del Barcellona, emerso recentemente come talento promettente. Ha segnato il suo primo gol in Liga contro il Mallorca nel settembre 2023.', 7.5, 'Fermín_López.jpg'],
    ['Oihan', 'Sancet', 25, 'Centrocampista offensivo spagnolo dell\'Athletic Bilbao, apprezzato per la sua creatività e capacità di inserimento. È un elemento chiave nel sistema offensivo della squadra basca.', 8.0, 'Oihan_Sancet.jpg'],
    ['Georgiy', 'Sudakov', 22, 'Centrocampista ucraino dello Shakhtar Donetsk, noto per la sua visione di gioco e abilità nei passaggi. Ha segnato il suo primo gol in Champions League contro il Barcellona nell\'ottobre 2023.', 7.5, 'Georgiy_Sudakov.jpg'],
    ['Charles', 'De Ketelaere', 24, 'Centrocampista offensivo belga dell\'Atalanta, versatile e tecnico, capace di giocare anche come attaccante. Ha mostrato buone prestazioni in Serie A.', 8.0, 'Charles_De Ketelaere.jpg'],

    // ESTERNI DESTRI (ED)
     
    ['Noussair', 'Mazraoui', 27, 'Giocatore del Manchester United e della nazionale marocchina, Mazraoui è apprezzato per la sua versatilità, potendo giocare sia come terzino destro che sinistro. La sua tecnica e intelligenza tattica lo rendono un elemento chiave nella difesa dei Red Devils.', 9.2, 'Noussair_Mazraoui.jpg'],
    ['Wilfried', 'Singo', 24, 'Esterno del Monaco e della nazionale ivoriana, Singo è noto per la sua velocità, forza fisica e capacità di supportare l\'attacco. Ha avuto un ruolo importante nella vittoria della Coppa d\'Africa 2023 con la Costa d\'Avorio.', 9.0, 'Wilfried_Singo.jpg'],
    ['Issa', 'Kaboré', 24, 'Giocatore del Werder Brema e della nazionale burkinabe, Kabore è noto per la sua velocità e capacità di supportare l\'attacco. Ha avuto esperienze in diversi campionati europei, mostrando costante crescita.', 8.7, 'Issa_Kaboré.jpg'],
    ['Raoul', 'Bellanova', 25, 'Esterno italiano dell\'Atalanta, noto per la sua velocità e capacità di spinta sulla fascia destra. Ha giocato in diversi club italiani, tra cui Torino e Inter, mostrando una crescita costante.', 7.5, 'Raoul_Bellanova.jpg'],
    ['Nathan', 'Tella', 25, 'Esterno nigeriano del Bayer Leverkusen, con esperienza nel calcio inglese. Dopo essere stato rilasciato dall\'Arsenal, ha trovato successo in Germania, contribuendo significativamente al titolo della Bundesliga del Leverkusen.', 8.0, 'Nathan_Tella.jpg'],
    ['Marcos', 'Llorente', 30, 'Esterno spagnolo dell\'Atletico Madrid, apprezzato per la sua versatilità. Capace di giocare in diverse posizioni, tra cui centrocampista centrale, laterale destro e attaccante di supporto. Ha avuto un ruolo chiave nel successo dell\'Atletico nella Liga.', 8.5, 'Marcos_Llorente.jpg'],


    // ESTERNI SINISTRI (ES)

    ['Renan', 'Lodi', 26, 'Esterno del Nottingham Forest e della nazionale brasiliana, Lodi è apprezzato per la sua solidità difensiva e capacità di supportare l\'attacco. Ha avuto un ruolo chiave nella vittoria della Coppa del Mondo 2022 con il Brasile.', 8.7, 'Renan_Lodi.jpg'],
    ['Patrick', 'Dorgu', 19, 'Esterno mancino dello United , noto per la sua velocità e abilità nelle sovrapposizioni. Ha dimostrato promettenti qualità difensive e tecniche nonostante la giovane età.', 7.0, 'Patrick_Dorgu.jpg'],
    ['Jacob', 'Ramsey', 24, 'Esterno inglese dell\'Aston Villa, apprezzato per la sua dinamicità e capacità di inserirsi in area avversaria. Ha migliorato costantemente il suo rendimento in Premier League.', 7.5, 'Jacob_Ramsey.jpg'],

    // ALI DESTRE (AD)

    ['Mohamed', 'Salah', 32, 'Attaccante del Liverpool e della nazionale egiziana, Salah continua a essere uno dei giocatori più prolifici al mondo. Nella stagione 2024-25 ha registrato 27 gol e 18 assist in Premier League, dimostrando una costanza straordinaria nel rendimento.', 9.7, 'Mohamed_Salah.jpg'],
    ['Bukayo', 'Saka', 23, 'Esterno dell’Arsenal e della nazionale inglese, Saka è noto per la sua velocità, dribbling e capacità di creare occasioni. Ha guidato l’Arsenal in una stagione di successo, contribuendo con gol e assist decisivi.', 9.5, 'Bukayo_Saka.jpg'],
    ['Lamine', 'Yamal', 17, 'Giocatore del Barcellona e della nazionale spagnola, Yamal è considerato uno dei talenti più promettenti al mondo. Nonostante la giovane età, ha mostrato maturità e abilità tecniche eccezionali, diventando un punto fermo nel Barcellona.', 9.4, 'Lamine_Yamal.jpg'],
    ['Rodrygo', 'Goes', 24, 'Esterno del Real Madrid e della nazionale brasiliana, Rodrygo è apprezzato per la sua agilità, dribbling e capacità di segnare. Ha avuto un ruolo chiave nei successi recenti del Real Madrid, inclusa la vittoria della Champions League.', 9.3, 'Rodrygo_Goes.jpg'],
    ['Ousmane', 'Dembélé', 27, 'Giocatore del Paris Saint-Germain e della nazionale francese, Dembele è noto per la sua velocità, abilità nel dribbling e imprevedibilità. Ha contribuito significativamente al successo del PSG in Ligue 1 e in Europa.', 9.2, 'Ousmane_Dembélé.jpg'],
    ['Michael', 'Olise', 23, 'Esterno del Bayern Monaco e della nazionale francese, Olise si distingue per la sua creatività, visione di gioco e precisione nei passaggi. Ha avuto un impatto immediato nel Bayern, diventando un elemento chiave nel loro attacco.', 9.1, 'Michael_Olise.jpg'],
    ['Takefusa', 'Kubo', 23, 'Giocatore della Real Sociedad e della nazionale giapponese, Kubo è apprezzato per la sua tecnica, agilità e intelligenza tattica. Ha continuato a crescere, diventando uno dei migliori esterni della Liga.', 9.0, 'Takefusa_Kubo.jpg'],
    ['Leroy', 'Sané', 29, 'Esterno del Bayern Monaco e della nazionale tedesca, Sane è apprezzato per la sua velocità, dribbling e capacità di creare occasioni. Ha continuato a essere un elemento fondamentale per il Bayern, contribuendo sia in Bundesliga che in Champions League.', 8.7, 'Leroy_Sané.jpg'],
    ['Dejan', 'Kulusevski', 25, 'Ala destra svedese del Tottenham Hotspur, noto per la sua velocità, dribbling e capacità di segnare. Ha consolidato il suo ruolo nella squadra londinese.', 8.0, 'Dejan_Kulusevski.jpg'],
    ['Christian', 'Pulisic', 26, 'Ala statunitense del Milan, noto per la sua velocità, agilità e capacità nel dribbling. Ha avuto un impatto significativo nella Serie A italiana.', 8.2, 'Christian_Pulisic.jpg'],
    ['Arda', 'Güler', 20, 'Ala destra turca del Real Madrid, apprezzato per la sua tecnica raffinata e visione di gioco. Considerato uno dei talenti emergenti più promettenti in Europa.', 8.5, 'Arda_Güler.jpg'],
    ['Karim', 'Adeyemi', 23, 'Attaccante tedesco del Borussia Dortmund, noto per la sua velocità esplosiva e abilità nel finalizzare. Ha contribuito significativamente alle prestazioni del Dortmund in Bundesliga.', 8.0, 'Karim_Adeyemi.jpg'],
    ['Savio', 'Moreira de Oliveira', 21, 'Conosciuto come Savinho, ala brasiliana del Girona, riconosciuto per la sua abilità nel dribbling e creatività offensiva. Ha attirato l\'attenzione per le sue prestazioni nella Liga spagnola.', 7.5, 'Sávio_Moreira de Oliveira.jpg'],
    ['Ethan', 'Nwaneri', 17, 'Giovane ala inglese dell\'Arsenal, noto per la sua precocità e abilità tecnica. Ha debuttato in Premier League a soli 15 anni, mostrando un potenziale significativo.', 7.0, 'Ethan_Nwaneri.jpg'],
    ['Mohammed', 'Kudus', 24, 'Ala ghanese del West Ham United, riconosciuto per la sua forza fisica e capacità di segnare gol decisivi. Ha avuto un impatto positivo in Premier League.', 8.0, 'Mohammed_Kudus.jpg'],
    ['Estevao', 'Willian Almeida de Oliveira', 18, 'Conosciuto come Estevao, giovane talento brasiliano del Palmeiras, noto per la sua velocità e abilità nel dribbling. Considerato uno dei prospetti più promettenti del calcio brasiliano.', 7.5, 'Estêvão_Willian Almeida de Oliveira.jpg'],
    ['Amad', 'Diallo', 22, 'Ala ivoriana del Manchester United, apprezzato per la sua tecnica e velocità. Ha mostrato lampi di talento sia in Premier League che durante i periodi in prestito.', 7.5, 'Amad_Diallo.jpg'],
    ['Johan', 'Bakayoko', 22, 'Ala belga del PSV Eindhoven, noto per la sua rapidità e capacità di creare occasioni da gol. Ha attirato l\'attenzione per le sue prestazioni nell\'Eredivisie.', 7.5, 'Johan_Bakayoko.jpg'],
    ['Edon', 'Zhegrova', 26, 'Ala kosovara del Lille, riconosciuto per la sua creatività e abilità nel dribbling. Ha contribuito alle prestazioni del Lille in Ligue 1.', 7.5, 'Edon_Zhegrova.jpg'],
    ['Dan', 'Ndoye', 24, 'Ala svizzera del Bologna, apprezzato per la sua versatilità e capacità di adattarsi a diversi ruoli offensivi. Ha mostrato progressi significativi in Serie A.', 7.5, 'Dan_Ndoye.jpeg'],
    ['Luis', 'Henrique', 24, 'Ala brasiliana del Botafogo, noto per la sua velocità e abilità nel dribbling. Ha esperienza sia nel campionato brasiliano che in Europa.', 7.0, 'Luis_Henrique.jpg'],
    ['Riccardo', 'Orsolini', 28, 'Ala italiana del Bologna, riconosciuto per il suo tiro potente e capacità di segnare gol dalla distanza. Punto fermo dell\'attacco del Bologna in Serie A.', 8.0, 'Riccardo_Orsolini.jpg'],
    ['Antony', 'Matheus dos Santos', 25, 'Conosciuto come Antony, ala brasiliana del Manchester United, noto per la sua velocità e abilità nel dribbling. Ha avuto un impatto significativo in Premier League.', 8.0, 'Antony_Matheus dos Santos.jpg'],
    ['Iñaki', 'Williams', 30, 'Attaccante spagnolo dell\'Athletic Bilbao, apprezzato per la sua velocità e resistenza. Detiene il record di presenze consecutive in La Liga, dimostrando affidabilità e costanza.', 8.0, 'Iñaki_Williams.jpg'],
    ['Nico', 'Gonzalez', 27, 'Ala argentina della Juventus riconosciuto per la sua tecnica di tiro e abilità nel salro in elevazione.', 7.5, 'Nico_González.jpg'],
    ['Lionel', 'Messi', 36, 'Considerato da molti il più grande calciatore di tutti i tempi, Messi ha rivoluzionato il ruolo di attaccante grazie alla sua visione di gioco, dribbling fulmineo e straordinaria capacità realizzativa. Vincitore di numerosi Palloni d\'Oro, Champions League e titoli nazionali, ha lasciato un segno indelebile sia al Barcellona che con la nazionale argentina. La sua intelligenza calcistica e la sua capacità lo rendono una leggenda vivente.', 9.8, 'Lionel_Messi.jpg'],


    // ALI SINISTRE (AS)

    ['Vinícius', 'Júnior', 24, 'Attaccante del Real Madrid e della nazionale brasiliana, Vinicius è noto per la sua velocità fulminea, dribbling eccezionale e capacità di segnare in momenti cruciali. Nella stagione 2024-25 ha registrato 18 gol e 10 assist, consolidando il suo status di uno dei migliori al mondo.', 9.8, 'Vinícius_Júnior.jpg'],
    ['Rafael', 'Leão', 26, 'Giocatore dell\'AC Milan e della nazionale portoghese, Leao è un talento esplosivo con una combinazione di forza fisica e tecnica raffinata. Nella stagione 2023-24 ha segnato 15 gol e fornito 14 assist, attirando l\'interesse di top club europei.', 9.6, 'Rafael_Leão.jpg'],
    ['Khvicha', 'Kvaratskhelia', 24, 'Esterno del Paris Saint-Germain e della nazionale georgiana, Kvaratskhelia è soprannominato "Kvaradona" per le sue abilità nel dribbling e la creatività. Dopo il successo con il Napoli, ha continuato a brillare in Ligue 1.', 9.5, 'Khvicha_Kvaratskhelia.jpg'],
    ['Luis', 'Díaz', 28, 'Ala del Liverpool e della nazionale colombiana, Diaz è riconosciuto per la sua agilità, dribbling e capacità di segnare. Nella stagione 2024-25 ha contribuito con 13 gol e 3 assist, diventando un punto fermo nell\'attacco dei Reds.', 9.4, 'Luis_Díaz.jpg'],
    ['Nico', 'Williàms', 22, 'Giocatore dell\'Athletic Club e della nazionale spagnola, Williams è emerso come una delle stelle emergenti grazie alla sua velocità e visione di gioco. Ha giocato un ruolo chiave nella vittoria della Spagna all\'Europeo 2024.', 9.3, 'Nico_Williams.jpg'],
    ['Kaoru', 'Mitoma', 28, 'Ala del Brighton & Hove Albion e della nazionale giapponese, Mitoma è noto per il suo dribbling elegante e la capacità di creare occasioni. Nella stagione 2024-25 ha segnato 11 gol e fornito 3 assist, attirando l\'attenzione di club come il Bayern Monaco.', 8.9, 'Kaoru_Mitoma.jpg'],
    ['Bryan', 'Mbeumo', 25, 'Giocatore del Brentford e della nazionale camerunese, Mbeumo ha avuto una stagione eccezionale con 20 gol e 7 assist in Premier League, suscitando l\'interesse di club come il Manchester United.', 8.8, 'Bryan_Mbeumo.jpg'],
    ['Eberechi', 'Eze', 26, 'Ala del Crystal Palace e della nazionale inglese, Eze è apprezzato per la sua creatività e tecnica sopraffina. Nella stagione 2024-25 ha registrato 25 contributi totali tra gol e assist, diventando un obiettivo di mercato per il Bayern Monaco.', 8.7, 'Eberechi_Eze.jpg'],
    ['Raphinha', 'Dias', 28, 'Giocatore del Barcellona e della nazionale brasiliana, Raphinha ha dimostrato grande efficacia con 17 gol e 10 assist in 23 partite nella stagione 2023-24, contribuendo significativamente ai successi del club catalano.', 8.6, 'Raphinha_Dias.jpg'],
    ['Morgan', 'Rogers', 22, 'Ala sinistra inglese del Manchester City, giovane talento con buona tecnica e velocità. Considerato un prospetto interessante per il futuro.', 7.0, 'Morgan_Rogers.jpg'],
    ['Bradley', 'Barcola', 22, 'Ala sinistra francese del Paris Saint-Germain, noto per la sua velocità, capacità di dribbling e finalizzazione. Ha mostrato un rapido sviluppo nel campionato francese.', 8.0, 'Bradley_Barcola.jpg'],
    ['Désiré', 'Doué', 19, 'Ala francese del Rennes, apprezzato per la sua versatilità e intelligenza tattica. Considerato uno dei giovani talenti più interessanti della Ligue 1.', 7.5, 'Désiré_Doué.jpg'],
    ['Cody', 'Gakpo', 26, 'Ala sinistra olandese del Liverpool, apprezzato per la sua altezza, forza fisica e versatilità offensiva. Ha avuto un impatto significativo in Premier League.', 8.5, 'Cody_Gakpo.jpg'],
    ['Gabriel', 'Martinelli', 23, 'Ala sinistra brasiliana dell\'Arsenal, riconosciuto per la sua agilità, tecnica e capacità di segnare gol. È un elemento chiave nell\'attacco dei Gunners.', 8.5, 'Gabriel_Martinelli.jpg'],
    ['Kenan', 'Yıldız', 20, 'Giovane talento turco della Juventus, capace di giocare come attaccante esterno o trequartista. Ha mostrato grande potenziale nel campionato italiano.', 7.5, 'Kenan_Yıldız.jpg'],
    ['Kingsley', 'Coman', 28, 'Ala francese del Bayern Monaco, noto per la sua velocità e abilità nel dribbling. Ha contribuito a numerosi successi del club tedesco.', 8.5, 'Kingsley_Coman.jpg'],
    ['Antoine', 'Semenyo', 25, 'Ala ghanese dell\'AFC Bournemouth, apprezzato per la sua forza fisica e capacità di segnare. Ha avuto un ruolo importante nella Premier League.', 7.5, 'Antoine_Semenyo.jpg'],
    ['Jérémy', 'Doku', 22, 'Ala belga del Manchester City, noto per la sua rapidità e abilità nel dribbling. È considerato uno dei giovani talenti più promettenti.', 8.0, 'Jérémy_Doku.jpg'],
    ['Jamie', 'Bynoe-Gittens', 20, 'Ala inglese del Borussia Dortmund, riconosciuto per la sua velocità e tecnica. Ha mostrato un grande potenziale nella Bundesliga.', 7.5, 'Jamie_Bynoe-Gittens.jpg'],
    ['Marcus', 'Rashford', 27, 'Attaccante inglese dell\'Aston Villa, noto per la sua velocità e capacità di segnare gol decisivi. Ha esperienza sia in Premier League che in competizioni europee.', 8.5, 'Marcus_Rashford.jpg'],
    ['Anthony', 'Gordon', 24, 'Ala inglese del Newcastle United, apprezzato per la sua agilità e capacità di creare occasioni da gol. Ha avuto un impatto positivo nel campionato inglese.', 8.0, 'Anthony_Gordon.jpg'],
    ['Álex', 'Baena', 23, 'Ala spagnola del Villarreal, noto per la sua visione di gioco e abilità nei passaggi. Ha attirato l\'attenzione di diversi club europei.', 8.0, 'Álex_Baena.jpg'],
    ['Geovany', 'Quenda', 18, 'Giovane ala portoghese dello Sporting CP, riconosciuto per la sua velocità e tecnica. Considerato un prospetto interessante per il futuro.', 7.0, 'Geovany_Quenda.jpg'],
    ['Serge', 'Gnabry', 29, 'Ala tedesca del Bayern Monaco, noto per la sua velocità e capacità di segnare gol. Ha contribuito significativamente ai successi del club.', 8.5, 'Serge_Gnabry.jpg'],
    ['Heung-min', 'Son', 32, 'Attaccante sudcoreano del Tottenham Hotspur, apprezzato per la sua velocità, versatilità e capacità di segnare gol. Ha avuto una carriera di successo in Premier League.', 9.0, 'Heung-min_Son.jpg'],
    ['Antonio', 'Nusa', 20, 'Ala norvegese del RB Leipzig, noto per la sua velocità e abilità nel dribbling. Ha mostrato un grande potenziale nella Bundesliga.', 7.5, 'Antonio_Nusa.jpg'],
    ['Jadon', 'Sancho', 25, 'Ala inglese del Manchester United, riconosciuto per la sua tecnica e creatività. Ha esperienza sia in Premier League che in Bundesliga.', 8.0, 'Jadon_Sancho.jpg'],
    ['Ferran', 'Torrès', 24, 'Esterno offensivo spagnolo del Barcellona, apprezzato per la sua velocità e duttilità. Alterna ottime prestazioni a momenti meno brillanti, ma resta un jolly offensivo utile.', 7.5, 'Ferran_Torres.jpg'],


    // PUNTE CENTRALI (PC)

    ['Erling', 'Haaland', 24, 'Attaccante del Manchester City e della nazionale norvegese, Haaland ha segnato 21 gol in Premier League e 8 in Champions League nella stagione 2024-25. La sua combinazione di potenza fisica, velocità e finalizzazione lo rende uno dei centravanti più temuti al mondo.', 9.7, 'Erling_Haaland.jpg'],
    ['Kylian', 'Mbappé', 26, 'Giocatore del Real Madrid e della nazionale francese, Mbappe ha realizzato 28 gol in Liga e 7 in Champions League nella stagione 2024-25. Sebbene spesso parta da sinistra, la sua efficacia come centravanti è indiscutibile.', 9.6, 'Kylian_Mbappé.jpg'],
    ['Harry', 'Kane', 31, 'Attaccante del Bayern Monaco e della nazionale inglese, Kane ha segnato 25 gol in Bundesliga e 11 in Champions League nella stagione 2024-25. La sua visione di gioco e capacità di finalizzazione lo mantengono ai vertici del calcio mondiale.', 9.5, 'Harry_Kane.jpg'],
    ['Victor', 'Osimhen', 26, 'Giocatore del Napoli e della nazionale nigeriana, Osimhen ha realizzato 21 gol in Serie A e 5 in Champions League nella stagione 2024-25. La sua velocità e forza fisica lo rendono un attaccante completo.', 9.4, 'Victor_Osimhen.jpg'],
    ['Alexander', 'Isak', 25, 'Attaccante del Newcastle United e della nazionale svedese, Isak ha segnato 23 gol e fornito 6 assist in Premier League nella stagione 2024-25. La sua tecnica e mobilità lo rendono uno dei migliori giovani centravanti.', 9.3, 'Alexander_Isak.jpg'],
    ['Serhou', 'Guirassy', 29, 'Giocatore del Borussia Dortmund e della nazionale guineana, Guirassy ha segnato 10 gol in Champions League nella stagione 2024-25, diventando uno dei migliori marcatori della competizione. La sua capacità di finalizzazione è notevole.', 9.2, 'Serhou_Guirassy.jpg'],
    ['Romelu', 'Lukaku', 32, 'Attaccante del Napoli e della nazionale belga, Lukaku ha stabilito un record segnando 14 gol nelle qualificazioni agli Europei 2024. La sua esperienza e forza fisica lo rendono un punto di riferimento in attacco.', 9.1, 'Romelu_Lukaku.jpg'],
    ['Yoane', 'Wissa', 28, 'Giocatore del Brentford e della nazionale congolese, Wissa ha segnato 19 gol in Premier League nella stagione 2024-25. La sua capacità di finalizzazione e movimento lo rendono un attaccante efficace.', 9.0, 'Yoane_Wissa.jpg'],
    ['Jørgen', 'Strand Larsen', 24, 'Attaccante del Wolverhampton Wanderers e della nazionale norvegese, Strand Larsen ha segnato 13 gol in Premier League nella stagione 2024-25. La sua presenza fisica e abilità nel gioco aereo sono notevoli.', 8.9, 'Jørgen_Strand Larsen.jpg'],
    ['Chris', 'Wood', 33, 'Giocatore del Nottingham Forest e della nazionale neozelandese, Wood ha segnato 20 gol in Premier League nella stagione 2024-25. La sua esperienza e capacità di finalizzazione lo rendono un attaccante affidabile.', 8.8, 'Chris_Wood.jpg'],
    ['Viktor', 'Gyökeres', 26, 'Attaccante svedese dello Sporting CP, noto per la sua forza fisica e abilità nel segnare gol. Ha attirato l\'attenzione di diversi club europei per le sue prestazioni.', 8.0, 'Viktor_Gyökeres.jpg'],
    ['Benjamin', 'Šeško', 21, 'Giovane attaccante sloveno dell\'RB Leipzig, riconosciuto per la sua altezza e abilità aerea. Considerato uno dei prospetti più promettenti nel calcio europeo.', 8.0, 'Benjamin_Šeško.jpg'],
    ['Victor', 'Boniface', 24, 'Attaccante nigeriano del Bayer Leverkusen, noto per la sua forza fisica e capacità di segnare gol. Ha avuto un impatto significativo nella Bundesliga.', 8.0, 'Victor_Boniface.jpg'],
    ['Jonathan', 'David', 25, 'Attaccante canadese del LOSC Lille, apprezzato per la sua velocità e abilità nel finalizzare. Ha attirato l\'interesse di diversi club di alto livello in Europa.', 8.5, 'Jonathan_David.jpg'],
    ['Mateo', 'Retegui', 26, 'Attaccante italiano dell\'Atalanta, noto per la sua capacità di segnare gol e il suo posizionamento intelligente. Ha mostrato costanza nelle sue prestazioni in Serie A.', 8.0, 'Mateo_Retegui.jpg'],
    ['Lautaro', 'Martínez', 27, 'Attaccante argentino dell\'Inter, riconosciuto per la sua agilità, tecnica e istinto nel segnare gol. È un punto fermo nell\'attacco dell\'Inter e della nazionale argentina.', 9.0, 'Lautaro_Martínez.jpg'],
    ['Moise', 'Kean', 25, 'Attaccante italiano della Fiorentina, noto per la sua forza fisica e capacità di segnare gol. Ha ritrovato la forma in Serie A dopo esperienze in Premier League e Ligue 1.', 7.5, 'Moise_Kean.jpg'],
    ['Hugo', 'Ekitiké', 22, 'Attaccante francese dell\'Eintracht Francoforte, dotato di ottima tecnica e fisicità. Ha mostrato buone qualità realizzative, ma deve trovare maggiore continuità.', 7.0, 'Hugo_Ekitiké.jpg'],
    ['Ollie', 'Watkins', 29, 'Punta inglese dell\'Aston Villa, noto per la sua capacità di attaccare la profondità e finalizzare. È stato tra i protagonisti della grande stagione del club in Premier League.', 8.5, 'Ollie_Watkins.jpg'],
    ['Darwin', 'Núñez', 25, 'Attaccante uruguaiano del Liverpool, potente e generoso nel pressing, ma talvolta impreciso sotto porta. Rimane comunque un pericolo costante per le difese.', 7.5, 'Darwin_Núñez.jpg'],


    // SECONDE PUNTE (SP)
     
    ['Ademola', 'Lookman', 27, 'Attaccante dell\'Atalanta e della nazionale nigeriana, Lookman ha avuto una stagione straordinaria, segnando una tripletta nella finale di Europa League. La sua velocità, dribbling e capacità di finalizzazione lo rendono una minaccia costante per le difese avversarie.', 9.6, 'Ademola_Lookman.jpg'],
    ['Julian', 'Álvarez', 25, 'Giocatore del Manchester City e della nazionale argentina, Alvarez è estremamente duttile e può giocare sia come punta centrale che seconda punta. Si distingue per il pressing, l’intelligenza tattica e la freddezza sotto porta. Nella stagione 2024-25 ha segnato 18 gol e fornito 10 assist in tutte le competizioni.', 9.5, 'Julian_Álvarez.jpg'],
    ['Albert', 'Gudmundsson', 27, 'Attaccante dell\'AZ Alkmaar e della nazionale islandese, Gudmundsson si distingue per la sua versatilità, visione di gioco e precisione nei passaggi. Ha avuto un impatto significativo nella Eredivisie, contribuendo con gol e assist decisivi.', 9.3, 'Albert_Gudmundsson.jpg'],
    ['Giacomo', 'Raspadori', 25, 'Giocatore del Napoli e della nazionale italiana, Raspadori è apprezzato per la sua intelligenza tattica, mobilità e capacità di collegare centrocampo e attacco. Ha continuato a crescere, diventando un punto fermo nell\'attacco del Napoli.', 9.2, 'Giacomo_Raspadori.jpg'],
    ['Adam', 'Hložek', 22, 'Attaccante del Bayer Leverkusen e della nazionale ceca, Hlozek è noto per la sua forza fisica, tecnica e capacità di giocare in diverse posizioni offensive. Ha mostrato una notevole maturità per la sua età, contribuendo significativamente al successo del Leverkusen.', 9.1, 'Adam_Hložek.jpg'],
    ['Nick', 'Woltemade', 23, 'Giocatore del Werder Brema e della nazionale tedesca, Woltemade si distingue per la sua altezza, controllo palla e abilità nel gioco aereo. Ha avuto una stagione positiva, attirando l\'attenzione di club più grandi.', 8.9, 'Nick_Woltemade.jpg'],
    ['Maksim', 'Glushenkov', 25, 'Attaccante del Lokomotiv Mosca e della nazionale russa, Glushenkov è apprezzato per la sua velocità, dribbling e capacità di creare occasioni. Ha continuato a essere una presenza costante nell\'attacco del Lokomotiv.', 8.8, 'Maksim_Glushenkov.jpg'],
    ['Sebastiano', 'Esposito', 22, 'Giocatore dell\'Empoli e della nazionale italiana, Esposito è noto per la sua tecnica, visione di gioco e capacità di finalizzazione. Ha mostrato segnali di crescita, diventando un elemento importante per l\'Empoli.', 8.7, 'Sebastiano_Esposito.jpg'],
    ['Róger', 'Guedes', 28, 'Attaccante dell\'Al-Rayyan e della nazionale brasiliana, Guedes si distingue per la sua forza fisica, tiro potente e abilità nel dribbling. Ha avuto un impatto significativo nella Qatar Stars League.', 8.6, 'Róger_Guedes.jpg'],
    ['Rafa', 'Sìlva', 32, 'Giocatore del Benfica e della nazionale portoghese, Sìlva è apprezzato per la sua esperienza, intelligenza tattica e capacità di segnare gol importanti. Continua a essere un punto di riferimento nell\'attacco del Benfica.', 8.5, 'Rafa_Silva.jpg'],
    ['Gabriel', 'Jesus', 28, 'Attaccante brasiliano dell\'Arsenal, riconosciuto per la sua agilità, tecnica e versatilità nel ruolo offensivo. Ha esperienza sia in Premier League che a livello internazionale.', 8.5, 'Gabriel_Jesus.jpg'],
    ['Loïs', 'Openda', 25, 'Attaccante belga dell\'RB Leipzig, noto per la sua velocità e capacità di dribbling. Ha mostrato un grande potenziale nella Bundesliga.', 8.0, 'Loïs_Openda.jpg'],
    ['Omar', 'Marmoush', 26, 'Attaccante egiziano del Manchester City, noto per la sua velocità e capacità di finalizzazione. Ha avuto un impatto significativo in Premier League dopo il trasferimento dall\'Eintracht Frankfurt.', 8.0, 'Omar_Marmoush.jpg'],
    ['Marcus', 'Thuràm', 27, 'Attaccante francese dell\'Inter, apprezzato per la sua versatilità nel giocare sia come centravanti che come ala. Ha contribuito significativamente al successo dell\'Inter in Serie A.', 8.5, 'Marcus_Thuram.jpg'],
    ['Randal', 'Kolo Muani', 26, 'Attaccante francese della Juventus, apprezzato per la sua versatilità e abilità nel creare occasioni da gol. Ha esperienza sia in Ligue 1 che in Serie A.', 8.0, 'Randal_Kolo Muani.jpg'],
    ['Kai', 'Havertz', 25, 'Attaccante tedesco dell\'Arsenal, noto per la sua versatilità tattica e intelligenza nel gioco. Può giocare come falso nueve o centrocampista offensivo, contribuendo in fase realizzativa e di manovra.', 8.0, 'Kai_Havertz.jpg'],
    ['Matheus', 'Cunha', 25, 'Attaccante brasiliano del Wolverhampton, capace di giocare sia come prima punta che seconda. Tecnico e dinamico, è cresciuto molto in Premier League.', 7.5, 'Matheus_Cunha.jpg'],

  ];

  for (const g of giocatori) {
    await runAsync(`INSERT INTO giocatori (nome, cognome, eta,  descrizione, voto, foto) VALUES (?, ?, ?, ?, ?, ?)`, g);
  }

  console.log('✅ Giocatori inseriti.');
}

async function seedRuoli() {
  await runAsync(`DELETE FROM ruoli`);

  const ruoli = [
    ['POR', 'Portiere'],
    ['DC', 'Difensore Centrale'],
    ['TD', 'Terzino Destro'],
    ['TS', 'Terzino Sinistro'],
    ['CDC', 'Centrocampista Difensivo'],
    ['CC', 'Centrocampista Centrale'],
    ['COC', 'Centrocampista Offensivo'],
    ['ED', 'Esterno Destro'],
    ['ES', 'Esterno Sinistro'],
    ['AD', 'Ala Destra'],
    ['AS', 'Ala Sinistra'],
    ['SP', 'Seconda Punta'],
    ['PC', 'Punta Centrale'],
  ];

  for (const r of ruoli) {
    await runAsync(`INSERT OR IGNORE INTO ruoli (codice, nome) VALUES (?, ?)`, r);
  }

  console.log('✅ Ruoli inseriti.');
}

async function seedGiocatoriRuoli() {
  const ruoloMap = {};
  const ruoliRows = await allAsync(`SELECT id, codice FROM ruoli`);
  ruoliRows.forEach(r => ruoloMap[r.codice] = r.id);

  const giocatori = await allAsync(`SELECT id, cognome FROM giocatori`);

  const mapping = [
  // PORTIERI (POR) 

  { cognome: 'Donnarumma', ruoli: ['POR'] },
  { cognome: 'Sommer', ruoli: ['POR'] },
  { cognome: 'Agkatsev', ruoli: ['POR'] },
  { cognome: 'Flekken', ruoli: ['POR'] },
  { cognome: 'Sánchez', ruoli: ['POR'] },
  { cognome: 'Gulácsi', ruoli: ['POR'] },
  { cognome: 'Ricardo', ruoli: ['POR'] },
  { cognome: 'Becker', ruoli: ['POR'] },
  { cognome: 'Costa', ruoli: ['POR'] },
  { cognome: 'Raya', ruoli: ['POR'] },
  { cognome: 'Kobel', ruoli: ['POR'] },
  { cognome: 'Vicario', ruoli: ['POR'] },
  { cognome: 'Mamardashvili', ruoli: ['POR'] },
  { cognome: 'Chevalier', ruoli: ['POR'] },
  { cognome: 'Simon', ruoli: ['POR'] },
  { cognome: 'Moraes', ruoli: ['POR'] },
  { cognome: 'Svilar', ruoli: ['POR'] },
  { cognome: 'Martinez', ruoli: ['POR'] },
  { cognome: 'Carnesecchi', ruoli: ['POR'] },
  { cognome: 'Verbruggen', ruoli: ['POR'] },
  { cognome: 'Ter Stegen', ruoli: ['POR'] },
  { cognome: 'Maignan', ruoli: ['POR'] },
  { cognome: 'Courtois', ruoli: ['POR'] },
  { cognome: 'Oblak', ruoli: ['POR'] },

    // TERZINI DESTRI (TD)

  { cognome: 'Hakimi', ruoli: ['TD','ED'] },
  { cognome: 'Alexander-Arnold', ruoli: ['TD','ED'] },
  { cognome: 'Frimpong', ruoli: ['TD','ED'] },
  { cognome: 'Koundé', ruoli: ['TD','DC'] },
  { cognome: 'Porro', ruoli: ['TD','ED'] },
  { cognome: 'Dumfries', ruoli: ['TD','ED'] },
  { cognome: 'James', ruoli: ['TD','ED'] },
  { cognome: 'Timber', ruoli: ['TD','DC'] },
  { cognome: 'Boey', ruoli: ['TD'] },
  { cognome: 'Dalot', ruoli: ['TD'] },
  { cognome: 'Livramento', ruoli: ['TD','ED'] },
  { cognome: 'Cordeiro dos Santos', ruoli: ['TD','ED'] },
  { cognome: 'Cancelo', ruoli: ['TD','ED'] },
  { cognome: 'Carvajal', ruoli: ['TD'] },
  { cognome: 'Molina', ruoli: ['TD','ED'] },
  { cognome: 'White', ruoli: ['TD','DC'] },
  { cognome: 'Lewis', ruoli: ['TD'] },
  { cognome: 'Di Lorenzo', ruoli: ['TD'] },
  { cognome: 'Laimer', ruoli: ['TD','CC'] },

  // TERZINI SINISTRI (TS)

  { cognome: 'Dimarco', ruoli: ['TS','ES'] },
  { cognome: 'Mendes', ruoli: ['TS','ES'] },
  { cognome: 'Balde', ruoli: ['TS','ES'] },
  { cognome: 'Davies', ruoli: ['TS','ES'] },
  { cognome: 'Hernandez', ruoli: ['TS','ES'] },
  { cognome: 'Grimaldo', ruoli: ['TS','ES'] },
  { cognome: 'Udogie', ruoli: ['TS','ES'] },
  { cognome: 'Robinson', ruoli: ['TS','ES'] },
  { cognome: 'Cucurella', ruoli: ['TS','ES'] },
  { cognome: 'Cambiaso', ruoli: ['TS','ES'] },
  { cognome: 'Kerkez', ruoli: ['TS','ES'] },
  { cognome: 'Calafiori', ruoli: ['TS','DC'] },
  { cognome: 'Carreras', ruoli: ['TS','ES'] },
  { cognome: 'Robertson', ruoli: ['TS'] },
  { cognome: 'Gutiérrez', ruoli: ['TS','ES'] },
  { cognome: 'Kadıoğlu', ruoli: ['TS','TD','ES'] },
  { cognome: 'Hato', ruoli: ['TS','DC'] },

  // DIFENSORI CENTRALI (DC)

  { cognome: 'Dias', ruoli: ['DC'] },
  { cognome: 'Saliba', ruoli: ['DC'] },
  { cognome: 'Gvardiol', ruoli: ['DC','TS'] },
  { cognome: 'Rüdiger', ruoli: ['DC'] },
  { cognome: 'Bastoni', ruoli: ['DC'] },
  { cognome: 'Magalhães', ruoli: ['DC'] },
  { cognome: 'van Dijk', ruoli: ['DC'] },
  { cognome: 'Min-jae', ruoli: ['DC'] },
  { cognome: 'Yoro', ruoli: ['DC'] },
  { cognome: 'Romero', ruoli: ['DC'] },
  { cognome: 'Cubarsí', ruoli: ['DC'] },
  { cognome: 'Konaté', ruoli: ['DC'] },
  { cognome: 'van de Ven', ruoli: ['DC'] },
  { cognome: 'Bremer', ruoli: ['DC'] },
  { cognome: 'Hincapié', ruoli: ['DC'] },
  { cognome: 'Buongiorno', ruoli: ['DC'] },
  { cognome: 'Huijsen', ruoli: ['DC'] },
  { cognome: 'Botman', ruoli: ['DC'] },
  { cognome: 'Aoás Corrêa', ruoli: ['DC'] },
  { cognome: 'Torres', ruoli: ['DC'] },
  { cognome: 'de Ligt', ruoli: ['DC'] },
  { cognome: 'Schlotterbeck', ruoli: ['DC'] },

  // CENTROCAMPISTI DIFENSIVI CENTRALI (CDC)

  { cognome: 'Hernández', ruoli: ['CDC'] },
  { cognome: 'Rice', ruoli: ['CDC'] },
  { cognome: 'Palhinha', ruoli: ['CDC'] },
  { cognome: 'Guimarães', ruoli: ['CDC','CC'] },
  { cognome: 'Camavinga', ruoli: ['CDC','CC'] },
  { cognome: 'Tchouaméni', ruoli: ['CDC'] },
  { cognome: 'Zubimendi', ruoli: ['CDC'] },
  { cognome: 'Çalhanoğlu', ruoli: ['CDC','CC'] },
  { cognome: 'Neves', ruoli: ['CDC','CC'] },
  { cognome: 'Gravenberch', ruoli: ['CDC'] },
  { cognome: 'Kimmich', ruoli: ['CDC','TD'] },
  { cognome: 'Hjulmand', ruoli: ['CDC'] },
  { cognome: 'Stiller', ruoli: ['CDC'] },
  { cognome: 'Casadó', ruoli: ['CDC'] },
  { cognome: 'Pavlović', ruoli: ['CDC'] },
  { cognome: 'Caicedo', ruoli: ['CDC'] },
  { cognome: 'Onana', ruoli: ['CDC'] },
  { cognome: 'Casemiro', ruoli: ['CDC'] },
  { cognome: 'Locatelli', ruoli: ['CDC'] },
  { cognome: 'Kanté', ruoli: ['CDC', 'CC'] },

    // CENTROCAMPISTI DIFENSIVI CENTRALI (CC)
    
    { cognome: 'Bellingham', ruoli: ['CC','COC'] },
    { cognome: 'Valverde', ruoli: ['CC','ED'] },
    { cognome: 'González', ruoli: ['CC'] },
    { cognome: 'Páez', ruoli: ['CC'] },
    { cognome: 'Mac Allister', ruoli: ['CC'] },
    { cognome: 'Barella', ruoli: ['CC'] },
    { cognome: 'Fernández', ruoli: ['CC','CDC'] },
    { cognome: 'Zaïre-Emery', ruoli: ['CC'] },
    { cognome: 'Machado Ferreira', ruoli: ['CC','CDC'] }, // Vitinha
    { cognome: 'José dos Santos Lourenço da Silva', ruoli: ['CC'] }, // Éderson
    { cognome: 'Reijnders', ruoli: ['CC'] },
    { cognome: 'Tonali', ruoli: ['CC','CDC'] },
    { cognome: 'de Jong', ruoli: ['CC','CDC'] },
    { cognome: 'Thuram', ruoli: ['CC'] },
    { cognome: 'McTominay', ruoli: ['CC','COC'] },
    { cognome: 'Ruiz', ruoli: ['CC'] },
    { cognome: 'Modric', ruoli: ['CC', 'CDC'] },


    // CENTROCAMPISTI OFFENSIVI CENTRALI (COC)
    
    { cognome: 'Musiala', ruoli: ['COC'] },
    { cognome: 'Wirtz', ruoli: ['COC'] },
    { cognome: 'Ødegaard', ruoli: ['COC'] },
    { cognome: 'Palmer', ruoli: ['COC'] },
    { cognome: 'De Bruyne', ruoli: ['COC','CC'] },
    { cognome: 'Fernandes', ruoli: ['COC'] },
    { cognome: 'Foden', ruoli: ['COC'] },
    { cognome: 'Olmo', ruoli: ['COC'] },
    { cognome: 'Griezmann', ruoli: ['COC','SP'] },
    { cognome: 'Simons', ruoli: ['COC'] },
    { cognome: 'Paz', ruoli: ['COC'] },         
    { cognome: 'Silva', ruoli: ['COC','AD'] },       
    { cognome: 'López', ruoli: ['COC','CC'] },       
    { cognome: 'Sancet', ruoli: ['COC','CC'] },
    { cognome: 'Sudakov', ruoli: ['COC'] },
    { cognome: 'De Ketelaere', ruoli: ['COC','AD'] },


    // ESTERNI DESTRI (ED)

    { cognome: 'Mazraoui', ruoli: ['ED'] },
    { cognome: 'Singo', ruoli: ['ED'] },
    { cognome: 'Kaboré', ruoli: ['ED'] },
    { cognome: 'Bellanova', ruoli: ['ED'] },
    { cognome: 'Tella', ruoli: ['ED'] },
    { cognome: 'Llorente', ruoli: ['ED','CC'] },

    // ESTERNI SINISTRI (ES)
 
    { cognome: 'Lodi', ruoli: ['ES'] },
    { cognome: 'Dorgu', ruoli: ['ES','TS'] },
    { cognome: 'Ramsey', ruoli: ['ES'] },

    // ALI DESTRE (AD)

    { cognome: 'Salah', ruoli: ['AD'] },
    { cognome: 'Saka', ruoli: ['AD'] },
    { cognome: 'Yamal', ruoli: ['AD'] },
    { cognome: 'Goes', ruoli: ['AD'] },
    { cognome: 'Dembélé', ruoli: ['AD','AS'] },
    { cognome: 'Olise', ruoli: ['AD'] },
    { cognome: 'Kubo', ruoli: ['AD'] },
    { cognome: 'Sané', ruoli: ['AD'] },
    { cognome: 'Kulusevski', ruoli: ['AD'] },
    { cognome: 'Pulisic', ruoli: ['AD','AS'] },
    { cognome: 'Güler', ruoli: ['AD','COC'] },
    { cognome: 'Adeyemi', ruoli: ['AD','ED'] },
    { cognome: 'Moreira de Oliveira', ruoli: ['AD'] }, // Savinho
    { cognome: 'Nwaneri', ruoli: ['AD'] },
    { cognome: 'Kudus', ruoli: ['AD'] },
    { cognome: 'Willian Almeida de Oliveira', ruoli: ['AD'] }, // Estêvão
    { cognome: 'Diallo', ruoli: ['AD'] },
    { cognome: 'Bakayoko', ruoli: ['AD'] },
    { cognome: 'Zhegrova', ruoli: ['AD'] },
    { cognome: 'Ndoye', ruoli: ['AD','AS'] },
    { cognome: 'Henrique', ruoli: ['AD','ED'] },
    { cognome: 'Orsolini', ruoli: ['AD'] },
    { cognome: 'Gonzalez', ruoli: ['AD','AS'] }, // Nico Gonzalez
    { cognome: 'Matheus dos Santos', ruoli: ['AD'] }, // Antony
    { cognome: 'Williams', ruoli: ['AD'] },
    { cognome: 'Messi', ruoli: ['AD','SP','COC'] },
     

    // ALI SINISTRE (AS)
     
  { cognome: 'Júnior', ruoli: ['AS'] },
  { cognome: 'Leão', ruoli: ['AS'] },
  { cognome: 'Kvaratskhelia', ruoli: ['AS'] },
  { cognome: 'Díaz', ruoli: ['AS'] },
  { cognome: 'Williàms', ruoli: ['AS'] },
  { cognome: 'Mitoma', ruoli: ['AS'] },
  { cognome: 'Mbeumo', ruoli: ['AS'] },
  { cognome: 'Eze', ruoli: ['AS'] },
  { cognome: 'Díaz', ruoli: ['AS'] },
  { cognome: 'Rogers', ruoli: ['AS'] },
  { cognome: 'Barcola', ruoli: ['AS'] },
  { cognome: 'Doué', ruoli: ['AS'] },
  { cognome: 'Gakpo', ruoli: ['AS'] },
  { cognome: 'Martinelli', ruoli: ['AS'] },
  { cognome: 'Yıldız', ruoli: ['AS','COC'] },
  { cognome: 'Coman', ruoli: ['AS'] },
  { cognome: 'Semenyo', ruoli: ['AS'] },
  { cognome: 'Doku', ruoli: ['AS'] },
  { cognome: 'Bynoe-Gittens', ruoli: ['AS'] },
  { cognome: 'Rashford', ruoli: ['AS','SP'] },
  { cognome: 'Gordon', ruoli: ['AS'] },
  { cognome: 'Baena', ruoli: ['AS'] },
  { cognome: 'Quenda', ruoli: ['AS'] },
  { cognome: 'Gnabry', ruoli: ['AS'] },
  { cognome: 'Son', ruoli: ['AS'] },
  { cognome: 'Nusa', ruoli: ['AS'] },
  { cognome: 'Sancho', ruoli: ['AS'] },
  { cognome: 'Torrès', ruoli: ['AS','AD'] },


  // PUNTE CENTRALI (PC)

  { cognome: 'Haaland', ruoli: ['PC'] },
  { cognome: 'Mbappé', ruoli: ['PC','AS'] },
  { cognome: 'Kane', ruoli: ['PC'] },
  { cognome: 'Osimhen', ruoli: ['PC'] },
  { cognome: 'Isak', ruoli: ['PC'] },
  { cognome: 'Guirassy', ruoli: ['PC'] },
  { cognome: 'Lukaku', ruoli: ['PC'] },
  { cognome: 'Wissa', ruoli: ['PC'] },
  { cognome: 'Strand Larsen', ruoli: ['PC'] },
  { cognome: 'Wood', ruoli: ['PC'] },
  { cognome: 'Gyökeres', ruoli: ['PC'] },
  { cognome: 'Šeško', ruoli: ['PC'] },
  { cognome: 'Boniface', ruoli: ['PC'] },
  { cognome: 'David', ruoli: ['PC','SP'] },
  { cognome: 'Retegui', ruoli: ['PC'] },
  { cognome: 'Martínez', ruoli: ['PC','SP'] },
  { cognome: 'Kean', ruoli: ['PC','SP'] },
  { cognome: 'Ekitiké', ruoli: ['PC'] },
  { cognome: 'Watkins', ruoli: ['PC'] },
  { cognome: 'Núñez', ruoli: ['PC','SP'] },

    // SECONDE PUNTE (SP)

    { cognome: 'Lookman', ruoli: ['SP','AS'] },
    { cognome: 'Álvarez', ruoli: ['SP','PC'] },
    { cognome: 'Gudmundsson', ruoli: ['SP'] },
    { cognome: 'Raspadori', ruoli: ['SP'] },
    { cognome: 'Hložek', ruoli: ['SP'] },
    { cognome: 'Woltemade', ruoli: ['SP'] },
    { cognome: 'Glushenkov', ruoli: ['SP'] },
    { cognome: 'Esposito', ruoli: ['SP'] },
    { cognome: 'Guedes', ruoli: ['SP'] },
    { cognome: 'Sìlva', ruoli: ['SP'] },
    { cognome: 'Jesus', ruoli: ['SP'] },
    { cognome: 'Openda', ruoli: ['SP'] },
    { cognome: 'Marmoush', ruoli: ['SP'] },
    { cognome: 'Thuràm', ruoli: ['SP','PC'] },
    { cognome: 'Kolo Muani', ruoli: ['SP','PC'] },
    { cognome: 'Havertz', ruoli: ['SP','COC'] },
    { cognome: 'Cunha', ruoli: ['SP','COC'] }

  
  ];

  for (const { cognome, ruoli } of mapping) {
    const giocatore = giocatori.find(g => g.cognome === cognome);
    if (!giocatore) {
      console.log(`Giocatore ${cognome} non trovato`);
      continue;
    }
    for (const r of ruoli) {
      if (!ruoloMap[r]) {
        console.log(`Ruolo ${r} non trovato`);
        continue;
      }
      await runAsync(`INSERT OR IGNORE INTO giocatori_ruoli (giocatore_id, ruolo_id) VALUES (?, ?)`, [giocatore.id, ruoloMap[r]]);
    }
  }

  console.log('✅ Mappatura giocatori-ruoli completata.');
}

async function seedAllenatori() {
  await runAsync(`DELETE FROM allenatori`);
  const allenatori = [
    ['Pep', 'Guardiola', 54, "Ha rivoluzionato il calcio moderno con il suo gioco di possesso, pressing organizzato e intelligenza tattica, vincendo in Spagna, Germania e Inghilterra, oltre a diverse Champions League.", 9.8, 'Pep_Guardiola.jpg'],
    ['Luis', 'Enrique', 55, "Celebre per aver guidato una delle squadre più spettacolari del Barcellona moderno, vincendo il triplete nel 2015 con un attacco micidiale e un gioco veloce e offensivo.", 9.3, 'Luis_Enrique.jpg'],
    ['Carlo', 'Ancelotti', 66, "Maestro della gestione umana e tattica, è l’unico ad aver vinto cinque Champions League da allenatore, segnando un’epoca in ognuno dei top club che ha allenato.", 9.5, 'Carlo_Ancelotti.jpg'],
    ['Hansi', 'Flick', 60, "Con il Bayern Monaco ha dominato il calcio europeo nel 2020 vincendo sei titoli in una stagione, grazie a un gioco verticale, aggressivo e organizzato.", 8.7, 'Hansi_Flick.jpg'],
    ['Simone', 'Inzaghi', 49, "Si è affermato come uno degli allenatori più preparati tatticamente in Italia, distinguendosi per la gestione delle coppe e la capacità di rendere le sue squadre molto equilibrate.", 8.6, 'Simone_Inzaghi.jpg'],
    ['Mikel', 'Arteta', 43, "Conosciuto per aver trasformato un gruppo giovane in una squadra moderna e ben organizzata, ha mostrato una maturità tattica sorprendente già nei suoi primi anni da tecnico.", 8.8, 'Mikel_Arteta.jpg'],
    ['Diego', 'Simeone', 54, "Emblema della grinta e dell’intensità, ha costruito un’Atletico Madrid capace di competere e vincere con solidità difensiva e spirito guerriero, anche contro avversari tecnicamente superiori.", 9.0, 'Diego_Simeone.jpg'],
    ['Xabi', 'Alonso', 43, "Ex centrocampista sopraffino, si è rivelato un allenatore brillante, con idee moderne, gioco elegante e una visione chiara del campo, emergendo rapidamente tra i migliori d'Europa.", 8.5, 'Xabi_Alonso.jpg'],
    ['Antonio', 'Conte', 55, "Famoso per l'intensità, la disciplina tattica e la capacità di costruire squadre vincenti fin dal primo anno, ha ottenuto successi importanti in Italia e Inghilterra.", 8.7, 'Antonio_Conte.jpg'],
    ['Jürgen', 'Klopp', 57, "Icona del calcio emozionale e ad alta intensità, ha saputo unire pressing, contropiede e spirito di gruppo per vincere tutto con una squadra costruita con visione e pazienza.", 9.2, 'Jürgen_Klopp.jpg']
  ];

  for (const a of allenatori) {
    await runAsync(`INSERT INTO allenatori (nome, cognome, eta, descrizione, voto, foto) VALUES (?, ?, ?, ?, ?, ?)`, a);
  }

  console.log('✅ Allenatori inseriti.');
}

async function seedCitazioni() {
  await runAsync(`DELETE FROM citazioni`);
  const citazioni = [
    ["“Non esiste uomo che non abbia provato piacere nel vedere una squadra batterne un'altra.”","⁓George Orwell", 'George Orwell.jpg'],
    ["“Gli italiani perdono le partite di calcio come se fossero guerre e perdono le guerre come se fossero partite di calcio.”","⁓Winston Churchill", 'Winston Churchill.jpg'],
    ['“Il calcio è arte di comprimere la storia in 90 minuti.”','⁓Pier Paolo Pasolini', 'Pier Paolo Pasolini.jpg'],
    ['“Il calcio è la cosa più importante tra le cose meno importanti.”','⁓Alex Ferguson', 'Alex Ferguson.jpg'],
    ['“A me sinceramente la parola leader non mi è mai piaciuta, più che altro mi metto a disposizione della squadra.”', '⁓Francesco Totti', 'Francesco Totti.jpg'],
    ['“Il calcio è semplice. Ma è difficile giocare semplice.”','⁓Johan Cruijff', 'Johan Cruijff.jpg'],
    ["“A mio parere la grande popolarità del calcio nel mondo è dovuta al fatto che in ogni piazza in ogni angolo del mondo c'è un bambino che gioca e si diverte con un pallone tra i piedi. Ma il calcio, oggi, è sempre più un'industria e sempre meno un gioco.”",'⁓Zdenek Zeman', "Zdenek Zeman.jpg"],
    ["“Il calcio è uno specchio della società: in questo gioco si riflettono le sue virtù e i suoi difetti.”","⁓Eduardo Galeano", 'Eduardo Galeano.jpg'],
    ["“Un rigore è un modo meschino di segnare.”","⁓Pelé", 'Pelé.jpg'],
    ["“Non c'è un altro posto del mondo dove l'uomo è più felice che in uno stadio di calcio.”","⁓Albert Camus", 'Albert Camus.jpg'],
    ["“Alcuni credono che il calcio sia una questione di vita o di morte. Non sono d'accordo. Il calcio è molto, molto di più.”","⁓Bill Shankly", 'Bill Shankly.jpg'],
    ["“I rigori li sbaglia solo chi ha il coraggio di tirarli.”","⁓Roberto Baggio", 'Roberto Baggio.jpg'],
    ["“Io sono contro ogni forma di razzismo, ma mia figlia in sposa a un giocatore del Milan non la darei mai.”",'⁓Peppino Prisco', 'Peppino Prisco.jpg'],
    ['“Cristiano Ronaldo: “La mia maestra mi diceva sempre di lasciar perdere il pallone, perché il calcio non mi avrebbe mai dato da mangiare.”','⁓Cristiano Ronaldo', 'Cristiano Ronaldo.jpg'],
    ['“Gli altri si allenano per vincere gli scudetti, io gioco per essere felice.”','⁓Antonio Cassano', 'Antonio Cassano.jpg'],
  ];

  for (const c of citazioni) {
    await runAsync(`INSERT INTO citazioni (testo, autore, foto) VALUES (?, ?, ?)`, c);
  }
  console.log('✅ Citazioni inserite.');
}

async function seedQuiz() {
  await runAsync(`DELETE FROM citazioni`);
   const domande = [
    ["Chi ha vinto il Pallone d'Oro nel 2023?", "Lionel Messi", "Cristiano Ronaldo", "Erling Haaland", "Kylian Mbappé"],
    ["Quale squadra ha vinto la Champions League 2024?", "Real Madrid", "Manchester City", "Arsenal", "Inter"],
    ["Quanti minuti dura una partita di calcio regolamentare?", "90", "80", "100", "75"],
    ["Chi è il miglior marcatore della storia dei Mondiali?", "Miroslav Klose", "Pelé", "Ronaldo", "Messi"],
    ["Cosa indica un cartellino rosso?", "Espulsione immediata", "Richiamo verbale", "Ammonizione", "Cambio obbligato"],
    ["Chi ha segnato il 'gol del secolo' nel 1986?", "Diego Maradona", "Pelé", "Zidane", "Ronaldinho"],
    ["Quale club ha vinto più Champions League?", "Real Madrid", "Barcellona", "Liverpool", "Milan"],
    ["In quale paese si è svolto il Mondiale del 2022?", "Qatar", "Russia", "USA", "Brasile"],
    ["Chi è l’attaccante norvegese del Manchester City famoso per i tanti gol?", "Erling Haaland", "Martin Ødegaard", "Joshua King", "Alexander Sørloth"],
    ["Cosa succede se un portiere tocca il pallone con le mani fuori area?", "Fallo e punizione", "Rigore", "Ripresa dal fondo", "Gol automatico"],
    ["Chi ha vinto l'Europeo del 2021?", "Italia", "Inghilterra", "Francia", "Spagna"],
    ["Qual è la distanza regolamentare di una porta da calcio?", "7,32 metri", "7 metri", "8 metri", "6,5 metri"],
    ["Chi ha il soprannome 'La Pulce'?", "Lionel Messi", "Sergio Agüero", "Diego Maradona", "Carlos Tévez"],
    ["Quanti giocatori ha in campo una squadra di calcio?", "11", "10", "12", "9"],
    ["Cosa si assegna in caso di fallo in area?", "Rigore", "Punizione indiretta", "Ammonizione", "Rimessa dal fondo"],
    ["Chi è noto per il famoso 'colpo dello scorpione'?", "René Higuita", "Zlatan Ibrahimovic", "Ronaldinho", "Cristiano Ronaldo"],
    ["Chi ha segnato più gol nella Serie A?", "Silvio Piola", "Francesco Totti", "Roberto Baggio", "Ciro Immobile"],
    ["Chi è il portiere titolare della Nazionale italiana nel 2025?", "Gianluigi Donnarumma", "Alex Meret", "Marco Carnesecchi", "Salvatore Sirigu"],
    ["Chi ha allenato il Barcellona nel triplete 2015?", "Luis Enrique", "Pep Guardiola", "Tito Vilanova", "Ronald Koeman"],
    ["Chi ha vinto il Mondiale del 2006?", "Italia", "Francia", "Germania", "Argentina"]
];

for (const d of domande) {
    await runAsync(
      `INSERT INTO quiz (domanda, risposta_corretta, risposta_errata1, risposta_errata2, risposta_errata3)
       VALUES (?, ?, ?, ?, ?)`,
      d
    );
}
console.log('✅ Domande Quiz inseriti.');
}


async function seedAdmin() {
  await runAsync('DELETE FROM utenti WHERE email = ?', ['admin@elitefootball.it']);
  const hashed = await bcrypt.hash('admin123', 10); // oppure la password che vuoi
  await runAsync(
    'INSERT INTO utenti (email, password, role) VALUES (?, ?, ?)',
    ['admin@elitefootball.it', hashed, 'admin']
  );
}


async function runSeed() {
  try {
    await seedRuoli();
    await seedGiocatori();
    await seedAllenatori();
    await seedQuiz ();
    await seedCitazioni();
    await seedGiocatoriRuoli();
    await seedAdmin();
    console.log('✅ Seeding completato con successo.');
    process.exit(0);
  } catch (error) {
    console.error('Errore nel seeding:', error);
    process.exit(1);
  }
}




runSeed();
