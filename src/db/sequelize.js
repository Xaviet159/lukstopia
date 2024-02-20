const { Sequelize, DataTypes } = require('sequelize')
const pokemonModel = require('../models/pokemon')
const pokemons = require('../db/pokemons')


const sequelize = new Sequelize(
    'lukstopia',
    'root',
    '',
    {
      host: 'localhost',
      dialect: 'mariadb',
      dialectOptions: {
        timezone: 'Etc/GMT-2'
      },
      logging: false
    }
  )

  sequelize.authenticate()
  .then(_ => console.log("vous vous etes bien connecté à la DB"))
  .catch(error => console.log(`une erreur est survenue lor de la connexion à la DB ${error}`))

  const Pokemon = pokemonModel(sequelize, DataTypes);

const initDb = async () => {
    const _ = await sequelize.sync({ force: true })
    console.log("sync OKE")
    pokemons.map(pokemon => {
        Pokemon.create({
            name: pokemon.name,
            hp: pokemon.hp,
            cp: pokemon.cp,
            picture: pokemon.picture,
            types: pokemon.types
        })
    })
}

module.exports = {
    initDb,
    Pokemon
}
