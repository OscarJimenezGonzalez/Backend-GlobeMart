const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')


const Product = connection.define('product', {
    name: {
        type: DataTypes.STRING,
        notNull: true
    },
    model: {
        type: DataTypes.STRING,
    },
    brand: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DOUBLE,
        notNull: true
    },
    imageURL: {
        type: DataTypes.STRING
    },
    onSale: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = Product