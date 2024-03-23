const router = require('express').Router()

const {
    createCartItem,
    getAllCartItems,
    getCartItemsFromOrder,
    getCartItemsFromSellerCompany,
    updateCartItem,
    updateCartItemListStatus,
    deleteCartItem,
    asociateCartItemToOrder,
} = require('../controllers/cartItem.controller')

const { checkAdmin, checkAuth } = require('../middlewares/authorization.middleware')

router

    .get('/seller/:sellerCompanyId', checkAuth, getCartItemsFromSellerCompany)
    .get('/customer/:orderId', checkAuth, getCartItemsFromOrder)
    .get('/', checkAdmin, getAllCartItems)
    .post('/customer', asociateCartItemToOrder)
    .post('/', createCartItem)
    .put('/:cartItemId', checkAdmin, updateCartItem)
    .put('/updateStatus/:orderId', updateCartItemListStatus)
    .delete('/:cartItemId', checkAdmin, deleteCartItem)

module.exports = router