const { connection } = require('../../database/index')
const { DataTypes } = require('sequelize');
const ProductCategory = require('./productCategory.model');

const Product_SellerCompany = connection.define('product_SellerCompany', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    price: {
        type: DataTypes.DOUBLE,
        notNull: true,
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
    },
    priceAfterSale: {
        type: DataTypes.DOUBLE
    }

}, {
    timestamps: false
})

// Codigo que me sirve para operar el porcentaje antes de guardar el registro del precio de venta

Product_SellerCompany.beforeSave((product, options) => {
    console.log('Before save hook triggered for product:', product.id);
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