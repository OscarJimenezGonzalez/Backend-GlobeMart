const router = require('express').Router()

const {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    createOwnProduct
} = require('../controllers/product.controller')

const { checkAdmin } = require('../middlewares/authorization.middleware')

router
    .get('/', getAllProducts)  // Solo pueden verlo los admins y los sellers (para crear versiones)
    .post('/profileSeller', createOwnProduct)
    .post('/', checkAdmin, createProduct)
    .put('/:productId', checkAdmin, updateProduct)
    .delete('/:productId', checkAdmin, deleteProduct)

module.exports = router