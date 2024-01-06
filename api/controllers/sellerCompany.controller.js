const SellerCompany = require('../models/sellerCompany.model.js')

const getAllSellerCompanies = async (req, res) => {

    try {

        const sellerCompanies = await SellerCompany.findAll({ where: req.query })

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

        const sellerCompany = await SellerCompany.create(req.body)

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

        const [sellerCompany] = await SellerCompany.update(req.body, {
            where: {
                id: req.params.sellerCompanyId
            }
        })
        if (sellerCompany.length > 0) {

            return res.status(200).json("SellerCompany was successfully Updated. ")
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

        const sellerCompany = await SellerCompany.destroy({
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

const getOwnSellerCompany = async (req, res) => {   /// Cambiar a relacion One to One 

    try {

        const currentUserId = res.locals.user.id
        const sellerCompany = await SellerCompany.findOne({
            where: {

                userId: currentUserId

            }
        })

        if (currentUserId) {

            return res.status(200).json(sellerCompany)

        }
        else {

            return res.status(400).send("Couldnt find Company.")

        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

const createOwnSellerCompany = async (req, res) => {

    try {

        const currentUserId = res.locals.user.id
        const sellerCompany = await SellerCompany.create({
            ...req.body,
            userId: currentUserId
        })
        if (sellerCompany) {

            return res.status(200).json(sellerCompany)

        }
        else {

            return res.status(400).send("Seller Company was not created.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

const updateOwnSellerCompany = async (req, res) => {
    try {

        const currentUserId = res.locals.user.id;
        const sellerCompany = await SellerCompany.findOne({

            where: {
                // cif: req.query.cif,  // al solo haber 1 empresa por persona no hace falta query para buscarla. 
                userId: currentUserId
            }

        });

        if (sellerCompany) {

            const [updatedRows] = await SellerCompany.update(req.body, {
                where: {
                    id: sellerCompany.id
                }
            });

            if (updatedRows > 0) {
                return res.status(200).json("SellerCompany was updated Successfully.");
            } else {
                return res.status(400).json("No SellerCompany was updated.");
            }
        } else {
            return res.status(401).send("You are not allowed to update this company or the company doesn't exist.");
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteOwnSellerCompany = async (req, res) => {

    try {


        const currentUserId = res.locals.user.id;
        const sellerCompany = await SellerCompany.findOne({

            where: {
                // cif: req.query.cif,    // al solo haber 1 empresa por persona no hace falta query para buscarla. 
                userId: currentUserId
            }

        });

        if (sellerCompany) {
            const sellerCompanyDeleted = await SellerCompany.destroy({
                where: {
                    id: sellerCompany.id
                }
            });

            if (sellerCompanyDeleted) {
                return res.status(200).json("SellerCompany was Deleted Successfully.");
            } else {
                return res.status(400).json("No SellerCompany was deleted.");
            }
        } else {
            return res.status(401).send("You are not allowed to delete this company or the company doesn't exist.");
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {

    getOwnSellerCompany,
    getAllSellerCompanies,
    createSellerCompany,
    createOwnSellerCompany,
    updateSellerCompany,
    updateOwnSellerCompany,
    deleteSellerCompany,
    deleteOwnSellerCompany

}