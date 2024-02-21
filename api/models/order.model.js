const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')


const Order = connection.define('order', {
    billNumber: {
        type: DataTypes.DOUBLE,
        notNull: true
    },
    shippingAddress: {
        type: DataTypes.STRING,
        notNull: true
    },
    date: {
        type: DataTypes.DATE,
        notNull: true
    },
    paymentMethod: {
        type: DataTypes.ENUM('PayPal', 'Credit Card', 'Bank Transfer'),
        defaultValue: "Credit Card"
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
        notNull: true
    },
    isPayed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Order