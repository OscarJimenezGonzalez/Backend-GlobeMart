const { connection, Sequelize } = require('../../database/index')
const { DataTypes } = require('sequelize')
const Product_SellerCompany = require('../models/product_sellerCompany.model')
const ProductReview = connection.define('productReview', {

    rating: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    opinion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    verifiedPurchase: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }

})

async function updateProductRatings(productId) {
    const reviews = await ProductReview.findAll({
        where: { productSellerCompanyId: productId },
        attributes: [
            [Sequelize.fn('AVG', Sequelize.col('rating')), 'avgRating'],
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'countReviews']
        ],
        raw: true,
    });

    if (reviews.length > 0) {
        const { avgRating, countReviews } = reviews[0];
        await Product_SellerCompany.update({
            rating: parseFloat(avgRating).toFixed(2), // Asegura 2 decimales para el rating
            numberOfRates: countReviews,
        }, {
            where: { id: productId }
        });
    }
}

// Hook después de crear una reseña
ProductReview.afterCreate((review, options) => {
    updateProductRatings(review.productSellerCompanyId);
});

// Hook después de actualizar una reseña
ProductReview.afterUpdate((review, options) => {
    updateProductRatings(review.productSellerCompanyId);
});

// Hook después de eliminar una reseña
ProductReview.afterDestroy((review, options) => {
    updateProductRatings(review.productSellerCompanyId);
});


module.exports = ProductReview