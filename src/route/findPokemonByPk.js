const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemon/:id', (req, res) => {
        Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            const message = `Un pokemon a été trouvé ${pokemon.name}`
            res.json({message, data: pokemon})
        })
    })
}