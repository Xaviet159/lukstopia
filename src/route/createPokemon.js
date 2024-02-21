const { Pokemon } = require('../db/sequelize')
const { ValidationError } = require('sequelize')

module.exports = (app) => {
    app.post('/api/pokemons/create', (req, res) => {
        Pokemon.create(req.body)
        .then(pokemon => {
            const message = `${req.body.name} a bien été créé`
            res.json({message, data: pokemon})
        })    
        .catch(error => {
            if(error instanceof ValidationError){
                return res.status(400).json({message: error.message, data: error})
            }
            message = "Le pokemon na pas pu etre créer, error."
            res.status(500).json({message, data: error})
        }) 
    })
}

