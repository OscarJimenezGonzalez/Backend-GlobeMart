const ProductCategory = require('../models/productCategory.model.js')

const getAllProductCategories = async (req, res) => {

    try {

        const productCategories = ProductCategory.findAll({ where: req.query })

        if (productCategories) {
            return res.status(200).json(productCategories)
        }
        else {
            return res.status(400).send("Product Categories Not Found")
        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const createProductCategory = async (req, res) => {

    try {

        const productCategory = ProductCategory.create(req.body)

        if (productCategory) {

            return res.status(200).json(productCategory)

        }
        else {

            return res.status(400).send("ProductCategory couldnt be created.")

        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const updateProductCategory = async (req, res) => {

    try {

        const productCategory = ProductCategory.update(req.body, {
            where: {
                id: req.params.productCategoryId
            }
        })
        if (productCategory) {
            return res.status(200).json(productCategory)
        }
        else {
            return res.status(400).send("Product Category couldnt be updated.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

const deleteProductCategory = async (req, res) => {

    try {

        const productCategory = ProductCategory.destroy({
            where: {
                id: req.params.productCategoryId
            }
        })
        if (productCategory) {
            return res.status(200).json("ProductCategory was deleted Successfully.")
        }
        else {
            return res.status(400).send("ProductCategory couldnt be deleted.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}



module.exports = {

    getAllProductCategories,
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,

}