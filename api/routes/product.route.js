const router = require('express').Router()

const {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/product.controller')

const { checkAdmin } = require('../middlewares/authorization.middleware')

router
    .get('/', checkAdmin, getAllProducts)
    .post('/', checkAdmin, createProduct)
    .put('/:productId', checkAdmin, updateProduct)
    .delete('/:productId', checkAdmin, deleteProduct)


module.exports = router