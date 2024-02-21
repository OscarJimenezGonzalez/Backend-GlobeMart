const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')


const CommercialAd = connection.define('order', {

    imageURL: {
        type: DataTypes.DOUBLE,
        notNull: true
    },
    description: {
        type: DataTypes.TEXT,
        notNull: true
    },
    title: {
        type: DataTypes.STRING,
        notNull: true
    }
})

module.exports = CommercialAd