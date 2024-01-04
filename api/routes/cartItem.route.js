const router = require('express').Router()

const {
    createCartItem,
    getAllCartItems,
    updateCartItem,
    deleteCartItem
} = require('../controllers/cartItem.controller')

const { checkAdmin } = require('../middlewares/authorization.middleware')

router
    .get('/', checkAdmin, getAllCartItems)
    .post('/', checkAdmin, createCartItem)
    .put('/:cartItemId', checkAdmin, updateCartItem)
    .delete('/:cartItemId', checkAdmin, deleteCartItem)


module.exports = router