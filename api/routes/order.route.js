const router = require('express').Router()

const {
    createOrder,
    createOwnOrder,
    getAllOrders,
    getOneOrder,
    getOwnOrders,
    updateOrder,
    deleteOrder,
} = require('../controllers/order.controller')

const { checkAdmin, checkAuth } = require('../middlewares/authorization.middleware')

router

    .get('/customer', checkAuth, getOwnOrders)
    .get('/:orderId', getOneOrder)
    .get('/', getAllOrders)
    .post('/customer', checkAuth, createOwnOrder)
    .post('/', checkAdmin, createOrder)
    .put('/:orderId', updateOrder)
    .delete('/:orderId', checkAdmin, deleteOrder)

module.exports = router