const router = require('express').Router()

const {
    createOrder,
    createOwnOrder,
    getAllOrders,
    updateOrder,
    deleteOrder,
} = require('../controllers/order.controller')

const { checkAdmin, checkAuth } = require('../middlewares/authorization.middleware')

router
    .get('/', checkAdmin, getAllOrders)
    .post('/customer', checkAuth, createOwnOrder)
    .post('/', checkAdmin, createOrder)
    .put('/:orderId', checkAdmin, updateOrder)
    .delete('/:orderId', checkAdmin, deleteOrder)





module.exports = router