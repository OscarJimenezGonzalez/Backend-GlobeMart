const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')


const ProductCategory = connection.define('productCategory', {
    name: {
        type: DataTypes.STRING,
        notNull: true,
        unique: true
    }
}, {
    timestamps: false
})

module.exports = ProductCategory