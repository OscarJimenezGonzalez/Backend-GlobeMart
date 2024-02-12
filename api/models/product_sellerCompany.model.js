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
        notNull: true,
        get() {
            // Utiliza el getter para formatear el precio con dos decimales
            const rawValue = this.getDataValue('price');
            // Asegúrate de que rawValue es un número antes de llamar a toFixed
            return rawValue !== null ? rawValue.toFixed(2) : null;
        }
    },
    onSale: {
        type: DataTypes.BOOLEAN
    },
    salePercentage: {
        type: DataTypes.INTEGER
    },
    qtyAvailable: {
        type: DataTypes.INTEGER
    },
    productDescription: {
        type: DataTypes.TEXT
    },
    hasShoeSizes: {
        type: DataTypes.BOOLEAN
    },
    hasClothingSizes: {
        type: DataTypes.BOOLEAN
    },
    hasColorOption: {
        type: DataTypes.BOOLEAN
    },
    isFineanceable: {
        type: DataTypes.BOOLEAN
    }

}, {
    timestamps: false
})

module.exports = Product_SellerCompany