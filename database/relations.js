const User = require('../api/models/user.model.js')
const Order = require('../api/models/order.model.js')
const CartItem = require('../api/models/cartItem.model.js')
const Product = require('../api/models/product.model.js')
const ProductCategory = require('../api/models/productCategory.model.js')
const SellerCompany = require('../api/models/sellerCompany.model.js')
const Product_SellerCompany = require('../api/models/product_sellerCompany.model.js')


const addRelationsToModels = () => {
    try {

        ProductCategory.hasMany(Product)
        Product.belongsTo(ProductCategory)

        SellerCompany.hasMany(Product_SellerCompany)
        Product_SellerCompany.belongsTo(SellerCompany)

        Product.hasMany(Product_SellerCompany)
        Product_SellerCompany.belongsTo(Product)

        User.hasOne(SellerCompany)
        SellerCompany.belongsTo(User)

        User.hasMany(CartItem)
        CartItem.belongsTo(User)

        Order.hasMany(CartItem)
        CartItem.belongsTo(Order)

        Product_SellerCompany.hasMany(CartItem, { foreignKey: 'productSellerCompanyId' })
        CartItem.belongsTo(Product_SellerCompany, { foreignKey: 'productSellerCompanyId' })

        console.log('Relations created!')

    } catch (error) {

        console.log(error)

    }

}

module.exports = addRelationsToModels