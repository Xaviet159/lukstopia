const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.put('/api/pokemons/:id', (req, res) => {
        const id = req.params.id
        Pokemon.update(req.body, {
            where: {id: id}
        })
        .then(_ => {
            Pokemon.findByPk(id).then(pokemon => {
                const message = `Nous avons bien modifier le pokemon ${pokemon.name}`
                res.json({message, data: pokemon})
            })
        })
    })
}