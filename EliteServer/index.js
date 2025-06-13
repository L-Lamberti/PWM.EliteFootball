const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');
const giocatoriRoutes = require('./routes/giocatori');
const allenatoriRoutes = require('./routes/allenatori');
const citazioniRoutes = require('./routes/citazioni');
const PORT = 3000;
const formazioniRouter = require('./routes/formazioni');
const quizRoutes = require('./routes/quiz');
const feedbackRouter = require('./routes/feedback'); 

          
app.use(cors({
  origin: 'http://localhost:8100',
  credentials: true
}));

app.use(express.json());
app.use('/api/feedback', feedbackRouter);
app.use('/api/formazioni', formazioniRouter);
app.use('/api/auth', authRoutes);
app.use('/api/giocatori', giocatoriRoutes);
app.use('/api/allenatori', allenatoriRoutes);
app.use('/api/citazioni', citazioniRoutes);
app.use('/api/quiz', quizRoutes);

app.get('/', (req, res) => {
  res.send('Successo');
});

app.listen(PORT, () => {
  console.log(`Server in ascolto su http://localhost:${PORT}`);
});
