const router = require('express').Router()

const {
    createCartItem,
    getAllCartItems,
    getCartItemsFromOrder,
    getCartItemsFromSellerCompany,
    // getTotalSalesFromSeller,
    updateCartItem,
    updateCartItemListStatus,
    deleteCartItem,
    asociateCartItemToOrder,
} = require('../controllers/cartItem.controller')

const { checkAdmin, checkAuth } = require('../middlewares/authorization.middleware')

router


    // .get('/sales/:sellerCompanyId', checkAuth, getTotalSalesFromSeller)
    .get('/seller/:sellerCompanyId', checkAuth, getCartItemsFromSellerCompany)
    .get('/customer/:orderId', checkAuth, getCartItemsFromOrder)
    .get('/', checkAdmin, getAllCartItems)
    .post('/customer', asociateCartItemToOrder)
    .post('/', createCartItem)
    .put('/:cartItemId', updateCartItem)
    .put('/updateStatus/:orderId', updateCartItemListStatus)
    .delete('/:cartItemId', checkAdmin, deleteCartItem)

module.exports = router