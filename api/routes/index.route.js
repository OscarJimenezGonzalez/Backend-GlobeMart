const router = require('express').Router()

const userRouter = require('./user.route')
const authRouter = require('./auth.route')
const productRouter = require('./product.route')
const productCategoryRouter = require('./productCategory.route')
const orderRouter = require('./order.route')
const cartItemRouter = require('./cartItem.route')
const sellerCompanyRouter = require('./sellerCompany.route')
const product_sellerCompanyRouter = require('./product_sellerCompany.route')
const productReview = require('./productReview.route')
const paymentRouter = require('./payment/payment.route')
// const commercialAddRouter = require('./commercialAdd.route')

const { checkAuth } = require('../middlewares/authorization.middleware')

router

    .use('/auth', authRouter)
    .use('/user', checkAuth, userRouter)
    .use('/product', checkAuth, productRouter)
    .use('/productCategory', productCategoryRouter)
    .use('/order', checkAuth, orderRouter)
    .use('/cartItem', checkAuth, cartItemRouter)
    .use('/sellerCompany', sellerCompanyRouter)
    .use('/productSellerCompany', product_sellerCompanyRouter)
    .use('/productReview', productReview)

    .use('/payment', paymentRouter)

// .use('/commercialAdd', commercialAddRouter)

module.exports = router 
