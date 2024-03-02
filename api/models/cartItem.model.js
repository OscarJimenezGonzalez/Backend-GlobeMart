const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')

const CartItem = connection.define('cartItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    shipped: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    settled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    timestamps: false
})

module.exports = CartItem