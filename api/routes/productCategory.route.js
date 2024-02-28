const router = require('express').Router()

const {
    createProductCategory,
    getAllProductCategories,
    updateProductCategory,
    deleteProductCategory
} = require('../controllers/productCategory.controller')

const { checkAdmin, checkAuth } = require('../middlewares/authorization.middleware')

router
    .get('/', getAllProductCategories)
    .post('/', checkAuth, checkAdmin, createProductCategory)
    .put('/:productCategoryId', checkAuth, checkAdmin, updateProductCategory)
    .delete('/:productCategoryId', checkAuth, checkAdmin, deleteProductCategory)

module.exports = router