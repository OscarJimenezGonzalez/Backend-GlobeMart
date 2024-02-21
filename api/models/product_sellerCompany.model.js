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
        product.priceAfterSale = product.price - discount;
        console.log(`Calculated priceAfterSale: ${product.priceAfterSale} for product: ${product.id}`);
    } else {
        product.priceAfterSale = product.price;
        console.log(`Product is not on sale. Set priceAfterSale = price for product: ${product.id}`);
    }
});


module.exports = Product_SellerCompany