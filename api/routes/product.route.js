const router = require('express').Router()

const {
    createProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} = require('../controllers/product.controller')

const { checkAdmin } = require('../middlewares/authorization.middleware')

router
    .get('/', getAllProducts)  // Tanto Admin como sellers pueden Ver todos los productos existentes.
    .post('/', createProduct)  // Tanto Admin como sellers pueden Crear Productos (Nuevos)
    .put('/:productId', checkAdmin, updateProduct)  // Solo admins pueden actualizar Productos.
    .delete('/:productId', checkAdmin, deleteProduct)   // Solo admins pueden Eliminar Productos.

module.exports = router