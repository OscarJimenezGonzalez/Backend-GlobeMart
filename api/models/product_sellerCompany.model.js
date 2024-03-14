const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize');

const Product_SellerCompany = connection.define('product_SellerCompany', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        notNull: true,
    },
    onSale: {
        type: DataTypes.BOOLEAN
    },
    salePercentage: {
        type: DataTypes.INTEGER
    },
    saleQuantity: {
        type: DataTypes.DECIMAL(10, 2),
    },
    priceAfterSale: {
        type: DataTypes.DECIMAL(10, 2),
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
    },

}, {
    timestamps: false
})

// Codigo que me sirve para operar el porcentaje antes de guardar el registro del precio de venta


Product_SellerCompany.beforeSave((product) => {

    // hook para obtener automáticamente la cantidad del descuento

    if (product.onSale && product.salePercentage) {

        // product.saleQuantity = product.price * (product.salePercentage / 100);
        product.saleQuantity = Math.round((product.price * (product.salePercentage / 100)) * 100) / 100

    }

    // hook para obtener automáticamente la cantidad despues del dicount

    if (product.onSale && product.salePercentage > 0) {

        const discount = product.price * (product.salePercentage / 100);
        product.priceAfterSale = Math.round((product.price - discount) * 100) / 100
        console.log(`Calculated priceAfterSale: ${product.priceAfterSale} for product: ${product.id}`);

    } else {

        product.priceAfterSale = Math.round((product.price) * 100) / 100;
        console.log(`Product is not on sale. Set priceAfterSale = price for product: ${product.id}`);

    }

});


module.exports = Product_SellerCompany