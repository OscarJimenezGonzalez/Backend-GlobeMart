const router = require('express').Router()

const {
    createSellerCompany,
    getAllSellerCompanies,
    updateSellerCompany,
    deleteSellerCompany,
    //Specific EndPoints
    getOwnSellerCompany,
    createOwnSellerCompany,
    updateOwnSellerCompany,
    deleteOwnSellerCompany

} = require('../controllers/sellerCompany.controller')

const { checkAdmin } = require('../middlewares/authorization.middleware')

router
    .get('/profileCompany', getOwnSellerCompany)
    .get('/', checkAdmin, getAllSellerCompanies)
    .post('/profileCompany', createOwnSellerCompany)
    .post('/', checkAdmin, createSellerCompany)
    .put('/profileCompany', updateOwnSellerCompany)
    .put('/:sellerCompanyId', checkAdmin, updateSellerCompany)
    .delete('/profileCompany', deleteOwnSellerCompany)
    .delete('/:sellerCompanyId', checkAdmin, deleteSellerCompany)

module.exports = router