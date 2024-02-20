const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.post('/api/pokemons/create', (req, res) => {
        Pokemon.create(req.body)
        .then(pokemon => {
            const message = `${req.body.name} a bien été créé`
            res.json({message, data: pokemon})
        })     
})}

