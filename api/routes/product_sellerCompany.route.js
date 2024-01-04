const router = require('express').Router()

const {
    createProductSellerCompany,
    getAllProductSellerCompanies,
    updateProductSellerCompany,
    deleteProductSellerCompany
} = require('../controllers/product_sellerCompany.controller')

const { checkAdmin } = require('../middlewares/authorization.middleware')

// OJO AL CHECKADMIN a la hora de recoger datos en otros controladores. 

router
    .get('/', checkAdmin, getAllProductSellerCompanies)
    .post('/', checkAdmin, createProductSellerCompany)
    .put('/:cartItemId', checkAdmin, updateProductSellerCompany)
    .delete('/:cartItemId', checkAdmin, deleteProductSellerCompany)

module.exports = router