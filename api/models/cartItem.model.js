const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')

const CartItem = connection.define('cartItem', {
    quantity: {
        type: DataTypes.INTEGER,
        notNull: true
    },
}, {
    timestamps: false
})

module.exports = CartItem