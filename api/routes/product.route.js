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
    .put('/:cartItemId', checkAdmin, updateProduct)
    .delete('/:cartItemId', checkAdmin, deleteProduct)


module.exports = router