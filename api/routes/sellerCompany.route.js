const router = require('express').Router()

const {
    createSellerCompany,
    getAllSellerCompanies,
    updateSellerCompany,
    deleteSellerCompany
} = require('../controllers/sellerCompany.controller')

const { checkAdmin } = require('../middlewares/authorization.middleware')

router
    .get('/', checkAdmin, getAllSellerCompanies)
    .post('/', checkAdmin, createSellerCompany)
    .put('/:sellerCompanyId', checkAdmin, updateSellerCompany)
    .delete('/:sellerCompanyId', checkAdmin, deleteSellerCompany)


module.exports = router