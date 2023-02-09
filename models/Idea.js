const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Idea extends Model {}

Idea.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        idea: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        choiceOne_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "choicr",
                key: "id"
            }
        },
        choiceTwo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "choicr",
                key: "id"
            }
        },
        choiceThree_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "choicr",
                key: "id"
            }
        },
        choiceFour_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "choicr",
                key: "id"
            }
        },
        choiceFive_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "choicr",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
      }
);

module.exports = Idea;

