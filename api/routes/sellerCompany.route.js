const router = require('express').Router()

const {
    createSellerCompany,
    getAllSellerCompanies,
    getOneSellerCompany,
    updateSellerCompany,
    deleteSellerCompany,
    //Specific EndPoints
    getOwnSellerCompany,
    createOwnSellerCompany,
    updateOwnSellerCompany,
    deleteOwnSellerCompany

} = require('../controllers/sellerCompany.controller')

const { checkAdmin, checkAuth } = require('../middlewares/authorization.middleware')

router
    .get('/profileCompany', checkAuth, getOwnSellerCompany)
    .get('/:sellerCompanyId', getOneSellerCompany)  // No hace falta estar logueado. 
    .get('/', checkAuth, checkAdmin, getAllSellerCompanies)
    .post('/profileCompany', checkAuth, createOwnSellerCompany)
    .post('/', checkAuth, checkAdmin, createSellerCompany)
    .put('/profileCompany', checkAuth, updateOwnSellerCompany)
    .put('/:sellerCompanyId', checkAuth, checkAdmin, updateSellerCompany)
    .delete('/profileCompany', checkAuth, deleteOwnSellerCompany)
    .delete('/:sellerCompanyId', checkAuth, checkAdmin, deleteSellerCompany)

module.exports = router