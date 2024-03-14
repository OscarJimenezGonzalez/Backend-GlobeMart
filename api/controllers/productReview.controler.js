const { where } = require('sequelize');
const ProductReview = require('../models/productReview.model');
const Product_SellerCompany = require('../models/product_sellerCompany.model')
const User = require('../models/user.model');


const getAllProductReviews = async (req, res) => {    // Solo pueden verlo los admins

    try {

        const productReviews = await ProductReview.findAll({ where: req.query })

        if (productReviews) {
            return res.status(200).json(productReviews)
        }
        else {
            return res.status(400).send("productReview Not Found")
        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const createProductReview = async (req, res) => {

    try {

        const productReview = await ProductReview.create(req.body)

        if (productReview) {

            return res.status(200).json(productReview)

        }
        else {

            return res.status(400).send("productReview couldnt be created.")

        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const createOwnProductReview = async (req, res) => {

    try {

        const currentUserId = res.locals.user.id
        const productReview = await ProductReview.create({

            ...req.body,
            userId: currentUserId

        })

        if (productReview) {

            return res.status(200).json(productReview)

        }
        else {

            return res.status(400).send("productReview couldnt be created.")

        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const updateProductReview = async (req, res) => {

    try {

        const [productReview] = await ProductReview.update(req.body, {
            where: {
                id: req.params.productReviewId
            }
        })
        if (productReview) {
            return res.status(200).json("productReview was Successfully updated.")
        }
        else {
            return res.status(400).send("productReview couldnt be updated.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

const deleteProductReview = async (req, res) => {

    try {

        const productReview = await ProductReview.destroy({
            where: {
                id: req.params.productReviewId
            }
        })
        if (productReview) {
            return res.status(200).json("productReview was deleted Successfully.")
        }
        else {
            return res.status(400).send("productReview couldnt be deleted.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}


const getProductReviewVersion = async (req, res) => {

    try {

        const productReviews = await ProductReview.findAll({

            where: {
                productSellerCompanyId: req.params.productSellerCompanyId
            },
            include: [{
                model: User,
                attributes: ['username'] // Atributos a seleccionar del modelo SellerCompany
            }]

        }

        )
        if (productReviews.length > 0) {
            return res.status(200).json(productReviews)
        }
        else {
            return res.status(400).send("productReview couldnt be deleted.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }


}


module.exports = {

    getAllProductReviews,
    getProductReviewVersion,
    createProductReview,
    createOwnProductReview,
    updateProductReview,
    deleteProductReview,

}