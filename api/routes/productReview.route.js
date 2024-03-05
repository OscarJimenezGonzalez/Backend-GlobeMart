const router = require('express').Router()

const {
    getAllProductReviews,
    getProductReviewVersion,
    createProductReview,
    updateProductReview,
    deleteProductReview,
} = require('../controllers/productReview.controler')

const { checkAdmin, checkAuth } = require('../middlewares/authorization.middleware')

router
    .get('/', getAllProductReviews)
    .get('/:productSellerCompanyId', getProductReviewVersion)
    .post('/', createProductReview)
    .put('/:productReviewId', updateProductReview)
    .delete('/:productReviewId', deleteProductReview)

module.exports = router