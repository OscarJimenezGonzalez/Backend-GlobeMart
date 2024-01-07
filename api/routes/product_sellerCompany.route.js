const router = require('express').Router()

const {
    createProductSellerCompany,
    getAllProductSellerCompanies,
    updateProductSellerCompany,
    deleteProductSellerCompany,
    getVersionOfProducts,
    createVersionOfProduct,
    updateVersionOfProduct,
    deleteVersionOfProduct,

} = require('../controllers/product_sellerCompany.controller')

const { checkAdmin } = require('../middlewares/authorization.middleware')

router
    .get('/profileSeller', getVersionOfProducts)
    .get('/', checkAdmin, getAllProductSellerCompanies)
    .post('/profileSeller/version', createVersionOfProduct)
    .post('/', checkAdmin, createProductSellerCompany)
    .put('/profileSeller/:productSellerCompanyId', updateVersionOfProduct)
    .put('/:productSellerCompanyId', checkAdmin, updateProductSellerCompany)
    .delete('/profileSeller/:productSellerCompanyId', deleteVersionOfProduct)
    .delete('/:productSellerCompanyId', checkAdmin, deleteProductSellerCompany)

module.exports = router