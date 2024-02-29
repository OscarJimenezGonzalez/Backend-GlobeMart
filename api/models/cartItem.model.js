const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')

const CartItem = connection.define('cartItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
}, {
    timestamps: false
})

module.exports = CartItem