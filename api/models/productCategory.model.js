const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')


const ProductCategory = connection.define('productCategory', {
    name: {
        type: DataTypes.STRING,
        notNull: true,
        unique: true
    }
})

module.exports = ProductCategory