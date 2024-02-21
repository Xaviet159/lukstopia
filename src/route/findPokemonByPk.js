const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemon/:id', (req, res) => {
        Pokemon.findByPk(req.params.id)
        .then(pokemon => {
            if(pokemon === null){
                const message = "Le pokemon nexiste pas"
                res.status(404).json({message})
            }
            const message = `Un pokemon a été trouvé ${pokemon.name}`
            res.json({message, data: pokemon})
        })
    })
}