const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')

const CartItem = connection.define('cartItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    settled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    cartItemStatus: {
        type: DataTypes.ENUM('Pending Payment', 'Awaiting Shipment', 'Shipped', 'On Delivery', 'Delivered'),
        defaultValue: 'Pending Payment'
    },
}, {
    timestamps: false
})

module.exports = CartItem