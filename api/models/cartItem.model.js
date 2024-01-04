const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')


const CartItem = connection.define('cartItem', {

}, {
    timestamps: false
})

module.exports = CartItem