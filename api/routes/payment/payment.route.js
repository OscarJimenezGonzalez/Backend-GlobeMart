const router = require('express').Router()

const {
    createPayment,
    getPayment
} = require('../../controllers/payment/payment.controller')

router

.post('/create-payment-intent', createPayment)

module.exports = router