const router = require('express').Router()

const {
    createProductCategory,
    getAllProductCategories,
    updateProductCategory,
    deleteProductCategory
} = require('../controllers/productCategory.controller')

const { checkAdmin } = require('../middlewares/authorization.middleware')

router
    .get('/', getAllProductCategories)
    .post('/', checkAdmin, createProductCategory)
    .put('/:productCategoryId', checkAdmin, updateProductCategory)
    .delete('/:productCategoryId', checkAdmin, deleteProductCategory)


module.exports = router