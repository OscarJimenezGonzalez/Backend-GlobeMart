const Product = require('../models/product.model.js')

const getAllProducts = async (req, res) => {    // All Roles

    try {

        const products = Product.findAll({ where: req.query })

        if (products) {
            return res.status(200).json(products)
        }
        else {
            return res.status(400).send("Product Not Found")
        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const createProduct = async (req, res) => {

    try {

        const product = Product.create(req.body)

        if (product) {

            return res.status(200).json(product)

        }
        else {

            return res.status(400).send("Product couldnt be created.")

        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const updateProduct = async (req, res) => {

    try {

        const product = Product.update(req.body, {
            where: {
                id: req.params.productId
            }
        })
        if (product) {
            return res.status(200).json(product)
        }
        else {
            return res.status(400).send("Product couldnt be updated.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

const deleteProduct = async (req, res) => {

    try {

        const product = Product.destroy({
            where: {
                id: req.params.ProductId
            }
        })
        if (product) {
            return res.status(200).json("Product was deleted Successfully.")
        }
        else {
            return res.status(400).send("Product couldnt be deleted.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}


// Specific EndPoints 

const getOwnSellerCompanyProducts = async (req, res) => {

    try {

    } catch (error) {

    }

}
const createOwnSellerCompanyProduct = async (req, res) => {

    try {

    } catch (error) {

    }

}

const updateOwnSellerCompanyProduct = async (req, res) => {

    try {

    } catch (error) {

    }

}
const deleteOwnSellerCompanyProduct = async (req, res) => {

    try {

    } catch (error) {

    }

}


module.exports = {

    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,

}