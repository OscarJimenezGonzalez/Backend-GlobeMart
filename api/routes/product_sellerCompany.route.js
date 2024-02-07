const router = require('express').Router()

const {
    createProductSellerCompany,
    getAllProductSellerCompanies,
    getOneVersionOfProduct,
    updateProductSellerCompany,
    deleteProductSellerCompany,
    getOwnVersionOfProducts,
    createVersionOfProduct,
    updateVersionOfProduct,
    deleteVersionOfProduct,

} = require('../controllers/product_sellerCompany.controller')

const { checkAdmin, checkAuth } = require('../middlewares/authorization.middleware')

router
    .get('/profileSeller', checkAuth, getOwnVersionOfProducts)  // Para que cada vendedor vea sus versiones de productos
    .get('/:productSellerCompanyId', getOneVersionOfProduct) // All
    .get('/', getAllProductSellerCompanies)  // *****Selected**** Ver todos los productos con sus datos de vendedor incluidos
    .post('/profileSeller/version', checkAuth, createVersionOfProduct)
    .post('/', checkAdmin, checkAuth, createProductSellerCompany)
    .put('/profileSeller/:productSellerCompanyId', checkAuth, updateVersionOfProduct)
    .put('/:productSellerCompanyId', checkAdmin, checkAuth, updateProductSellerCompany)
    .delete('/profileSeller/:productSellerCompanyId', checkAuth, deleteVersionOfProduct)
    .delete('/:productSellerCompanyId', checkAdmin, checkAuth, deleteProductSellerCompany)

module.exports = router