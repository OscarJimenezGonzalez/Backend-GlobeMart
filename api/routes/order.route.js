const router = require('express').Router()

const {
    createOrder,
    getAllOrders,
    updateOrder,
    deleteOrder
} = require('../controllers/order.controller')

const { checkAdmin } = require('../middlewares/authorization.middleware')

router
    .get('/', checkAdmin, getAllOrders)
    .post('/', checkAdmin, createOrder)
    .put('/:cartItemId', checkAdmin, updateOrder)
    .delete('/:cartItemId', checkAdmin, deleteOrder)


module.exports = router