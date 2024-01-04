const router = require('express').Router()

const {
    createProductCategory,
    getAllProductCategories,
    updateProductCategory,
    deleteProductCategory
} = require('../controllers/productCategory.controller')

const { checkAdmin } = require('../middlewares/authorization.middleware')

router
    .get('/', checkAdmin, getAllProductCategories)
    .post('/', checkAdmin, createProductCategory)
    .put('/:cartItemId', checkAdmin, updateProductCategory)
    .delete('/:cartItemId', checkAdmin, deleteProductCategory)


module.exports = router