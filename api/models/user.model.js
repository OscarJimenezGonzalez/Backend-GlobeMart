const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize')


const User = connection.define('user', {
    username: {
        type: DataTypes.STRING,
        notNull: true,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        notNull: true,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        notNull: true
    },
    role: {
        type: DataTypes.ENUM('admin', 'seller', 'customer'),
        defaultValue: "customer"
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = User