const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const { success } = require('./helper.js');
const pokemons = require('./pokemons.js');

const app = express();
const PORT = 3001;

app.use(morgan('dev'))

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
  res.send('Bitch pute de tootot de naigre');
});

app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  const message = "Nous avons bien trouvé le pokemon"
  res.json(success(message, pokemon))
}); 

app.get('/api/pokemons', (req, res) => {
  const message = "Voici la liste de tout les pokemon du pokedex"
  res.json(success(message, pokemons))
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
