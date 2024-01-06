const Product = require('../models/product.model.js')
const User = require('../models/user.model')
const SellerCompany = require('../models/sellerCompany.model')


const getAllProducts = async (req, res) => {    // All Roles

    try {

        const products = await Product.findAll({ where: req.query })

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

        const product = await Product.create(req.body)

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

        const [product] = await Product.update(req.body, {
            where: {
                id: req.params.productId
            }
        })
        if (product) {
            return res.status(200).json("Product was Successfully updated.")
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

        const product = await Product.destroy({
            where: {
                id: req.params.productId
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

const createOwnProduct = async (req, res) => {

    try {

        const currentUserRole = res.locals.user.role
        if (currentUserRole === 'seller') {

            const newProduct = await Product.create(req.body)
            if (newProduct) {

                return res.status(200).json(newProduct)

            } else {

                return res.status(400).send('Product wasnt Created.')

            }

        } else {

            return res.status(401).send('User not Authorized.')

        }

    } catch (error) {

        return res.status(500).json({ message: error.message })

    }

}

module.exports = {

    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    createOwnProduct

}