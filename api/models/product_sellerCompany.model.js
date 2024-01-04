const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')

const Product_SellerCompany = connection.define('product_SellerCompany', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    price: {
        type: DataTypes.DOUBLE,
        notNull: true
    },

    onSale: {
        type: DataTypes.BOOLEAN
    }

}, {
    timestamps: false
})

module.exports = Product_SellerCompany