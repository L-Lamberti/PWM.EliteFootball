const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const giocatoriRoutes = require('./routes/giocatori');
const allenatoriRoutes = require('./routes/allenatori');
const citazioniRoutes = require('./routes/citazioni');
const PORT = 3000;
const formazioniRouter = require('./routes/formazioni');

app.use(cors({
  origin: 'http://localhost:8100', // <-- Cambia con la porta del tuo frontend se serve
  credentials: true
}));

app.use(express.json());

app.use('/api/formazioni', formazioniRouter);
app.use('/api/auth', authRoutes);
app.use('/api/giocatori', giocatoriRoutes);
app.use('/api/allenatori', allenatoriRoutes);
app.use('/api/citazioni', citazioniRoutes);


app.get('/', (req, res) => {
  res.send('Successo');
});

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
