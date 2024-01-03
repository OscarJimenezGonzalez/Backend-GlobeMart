const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')


const CartItem = connection.define('cartItem', {

})

module.exports = CartItem