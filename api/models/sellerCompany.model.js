const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')


const SellerCompany = connection.define('sellerCompany', {

    cif: {
        type: DataTypes.STRING,
        notNull: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        notNull: true,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    policy: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,

    },
    logoURL: {
        type: DataTypes.STRING,
        allowNull: true

    },
    opinionNumber: {
        type: DataTypes.INTEGER,
        allowNull: true

    },
    customerRating: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },

})

module.exports = SellerCompany