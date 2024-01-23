const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')


const Product = connection.define('product', {
    name: {
        type: DataTypes.STRING,
        notNull: true,
        unique: true
    },
    model: {
        type: DataTypes.STRING,
        notNull: true,
        unique: true
    },
    brand: {
        type: DataTypes.STRING
    },
    imageURL: {
        type: DataTypes.STRING
    }
})

module.exports = Product