const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')


const Order = connection.define('order', {
    billNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // autoIncrement: true,
        // unique: true

    },
    shippingAddress: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentMethod: {
        type: DataTypes.ENUM('PayPal', 'Credit Card', 'Bank Transfer', 'Bizum'),
        defaultValue: "Credit Card",
    },

    deliveryMethod: {

        type: DataTypes.ENUM('Pick up', 'Normal Delivery', 'Express Delivery'),
        defaultValue: "Pick up"
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    isPayed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Order