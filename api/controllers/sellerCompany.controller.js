const SellerCompany = require('../models/sellerCompany.model.js')

const getAllSellerCompanies = async (req, res) => {

    try {

        const sellerCompanies = SellerCompany.findAll({ where: req.query })

        if (sellerCompanies) {
            return res.status(200).json(sellerCompanies)
        }
        else {
            return res.status(400).send("SellerCompany Not Found")
        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const createSellerCompany = async (req, res) => {

    try {

        const sellerCompany = SellerCompany.create(req.body)

        if (sellerCompany) {

            return res.status(200).json(sellerCompany)

        }
        else {

            return res.status(400).send("SellerCompany couldnt be created.")

        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const updateSellerCompany = async (req, res) => {

    try {

        const sellerCompany = SellerCompany.update(req.body, {
            where: {
                id: req.params.sellerCompanyId
            }
        })
        if (sellerCompany) {
            return res.status(200).json(sellerCompany)
        }
        else {
            return res.status(400).send("SellerCompany couldnt be updated.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

const deleteSellerCompany = async (req, res) => {

    try {

        const sellerCompany = SellerCompany.destroy({
            where: {
                id: req.params.sellerCompanyId
            }
        })
        if (sellerCompany) {
            return res.status(200).json("SellerCompany was deleted Successfully.")
        }
        else {
            return res.status(400).send("SellerCompany couldnt be deleted.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}


// Specific Endpoint 

const getOwnSellerCompany = async (req, res) => {

    try {

    } catch (error) {

    }

}

const createOwnSellerCompany = async (req, res) => {

    try {

    } catch (error) {

    }

}

const updateOwnSellerCompany = async (req, res) => {

    try {

    } catch (error) {

    }

}

const deleteOwnSellerCompany = async (req, res) => {

    try {

    } catch (error) {

    }

}

module.exports = {

    getAllSellerCompanies,
    createSellerCompany,
    updateSellerCompany,
    deleteSellerCompany,

}