/* L’API Rest et la Base de données : Créer un modèle Sequelize */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmpty: { msg: "Ce champ ne peut pas être vide" }
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Les HP doivent être en nombre entier"},
          notNull: { msg: "Ce champ ne peu pas être vide" },
          min: {
            args: [0],
            msg: 'Les points de vie doivent être supérieur ou égale à 0.'
          },
          max: {
            args: [100],
            msg: "les points de vie ne peuvent pas être inférieur à 99."
          },
          notNull: { msg: "Les point de vie sont une propriété requise"}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Vous devez entrer des nombres entier"}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types) {
          this.setDataValue('types', types.join())
        },
        validate: {
          isTypeValide(value){
            if(!value){
              throw new Error('Un pokémon doit au moin avoir un type')
            }
            if(value.split(",").length > 3){
              throw new Error('Un pokémon ne peut pas avoir plus de trois type')
            }
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }