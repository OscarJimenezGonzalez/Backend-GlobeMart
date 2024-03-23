const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')

const ProductReview = connection.define('productReview', {
    
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    opinion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    verifiedPurchase: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
    
})

module.exports = ProductReview