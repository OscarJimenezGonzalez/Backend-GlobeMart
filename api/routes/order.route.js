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
    .put('/:orderId', checkAdmin, updateOrder)
    .delete('/:orderId', checkAdmin, deleteOrder)


module.exports = router