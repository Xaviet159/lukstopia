const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons', (req, res) => {
        Pokemon.findAll()
            .then(pokemons => {
                const message = "Voici la liste de tout les pokemons"
                res.json({message, data: pokemons})
            })
    })
}