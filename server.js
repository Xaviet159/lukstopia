const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3001;

// Middleware pour analyser le JSON
app.use(express.json());

// Connexion à MongoDB
const uri = "mongodb://localhost:27017/lukstopiaDB";
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};
connectDB(); // Démarrer la connexion

// Schéma Mongoose pour 'Lotto'
const lottoSchema = new mongoose.Schema({
    number: Number,
    text: String
});

// Création du modèle Mongoose pour 'Lotto'
const Lotto = mongoose.model('Lotto', lottoSchema, 'maCollection');

app.post('/add-lotto', async (req, res) => {
    const { number, text } = req.body; // Utiliser le corps de la requête pour les données
    const newLotto = new Lotto({
      number,
      text
    });
  
    try {
      await newLotto.save(); // Sauvegarde le nouveau document dans la base de données
      res.status(201).send('Lotto entry added successfully.');
    } catch (error) {
      console.error('Error adding lotto entry:', error);
      res.status(500).send('Error adding lotto entry.');
    }
});

app.get('/get-lottos', async (req, res) => {
    try {
      const lottos = await Lotto.find(); // Récupère tous les documents de la collection 'Lotto'
      res.json(lottos);
    } catch (error) {
      console.error('Error fetching lotto entries:', error);
      res.status(500).send('Error fetching lotto entries.');
    }
});

app.get('/test', (req, res) => {
  res.send('Bitch pute naigre');
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
