const Product_SellerCompany = require('../models/product_sellerCompany.model')
const SellerCompany = require('../models/sellerCompany.model')
const Product = require('../models/product.model')

const getAllProductSellerCompanies = async (req, res) => {

    try {

        const productSellerCompany = await Product_SellerCompany.findAll({

            where: req.query,
            include: [{
                model: SellerCompany,
                attributes: ['name'] // Atributos a seleccionar del modelo SellerCompany
            },
            {
                model: Product,
                attributes: ['name', 'model', 'brand', 'imageURL'] // Atributos a seleccionar del modelo Product
            }]

        })

        if (productSellerCompany) {
            return res.status(200).json(productSellerCompany)
        }
        else {
            return res.status(400).send("Product-SellerCompany Not Found")
        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const createProductSellerCompany = async (req, res) => {

    try {

        const productSellerCompany = await Product_SellerCompany.create(req.body)

        if (productSellerCompany) {

            return res.status(200).json(productSellerCompany)

        }
        else {

            return res.status(400).send("ProductSellerCompany couldnt be created.")

        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const updateProductSellerCompany = async (req, res) => {

    try {

        const [productSellerCompany] = await Product_SellerCompany.update(req.body, {
            where: {
                id: req.params.productSellerCompanyId
            }
        })
        if (productSellerCompany) {
            return res.status(200).json(productSellerCompany)
        }
        else {
            return res.status(400).send("ProductSellerCompany couldnt be updated.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

const deleteProductSellerCompany = async (req, res) => {

    try {

        const productSellerCompany = await Product_SellerCompany.destroy({
            where: {
                id: req.params.productSellerCompanyId
            }
        })
        if (productSellerCompany) {
            return res.status(200).json("Product-SellerCompany was deleted Successfully.")
        }
        else {
            return res.status(400).send("Product-SellerCompany couldnt be deleted.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

// Specific EndPoints 

const getVersionOfProducts = async (req, res) => {

    try {

        const currentUserId = res.locals.user.id
        const currentCompany = await SellerCompany.findOne({

            where: {

                userId: currentUserId

            }

        })

        if (currentCompany) {

            try {

                const ownProducts = await Product_SellerCompany.findAll({

                    where: {
                        sellerCompanyId: currentCompany.id
                    },

                    include: [{
                        model: SellerCompany,
                        attributes: ['name'] // Atributos a seleccionar del modelo SellerCompany
                    },
                    {
                        model: Product,
                        attributes: ['name', 'model', 'brand'] // Atributos a seleccionar del modelo Product
                    }]

                })

                return res.status(200).json(ownProducts)

            } catch (error) {

                return res.status(400).send("Products not found.")

            }

        } else {

            return res.status(400).send("Seller Company not found.")

        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

const createVersionOfProduct = async (req, res) => {
    try {

        const currentUserId = res.locals.user.id;
        const currentSellerCompany = await SellerCompany.findOne({
            where: {
                userId: currentUserId
            }
        });

        if (currentSellerCompany) {

            const { productId } = req.body;

            const existingEntry = await currentSellerCompany.getProduct_SellerCompanies();
            const mapedEntry = existingEntry.map(object => object.productId)

            if (mapedEntry.includes(productId)) {

                return res.status(400).json({ message: 'Duplicate entry detected.' });

            } else {

                const newVersionOfProduct = await currentSellerCompany.createProduct_SellerCompany(req.body)

                if (newVersionOfProduct) {

                    return res.status(200).json(newVersionOfProduct)

                } else {

                    return res.status(400).json('New version wasnt created.');

                }

            }

        }

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }

};

const updateVersionOfProduct = async (req, res) => {
    try {
        const currentUserId = res.locals.user.id;
        const currentSellerCompany = await SellerCompany.findOne({
            where: {
                userId: currentUserId
            }
        });

        if (currentSellerCompany) {
            // Encontrar la entrada de Product_SellerCompany a actualizar
            // Es decir si el registro que buscamos, está en la lista de esta empresa, nos dejará.
            const productSellerCompanyToUpdate = await Product_SellerCompany.findByPk(req.params.productSellerCompanyId);

            if (!productSellerCompanyToUpdate) {
                return res.status(404).send("Product_SellerCompany not found.");
            }

            // Verificar que la entrada pertenezca a la empresa actual
            if (productSellerCompanyToUpdate.sellerCompanyId !== currentSellerCompany.id) {
                return res.status(401).send("You are not allowed to update this Product_SellerCompany.");
            }

            // Actualizar la entrada en Product_SellerCompany
            const updatedProductSellerCompany = await productSellerCompanyToUpdate.update(req.body);

            if (updatedProductSellerCompany) {
                return res.status(200).json(updatedProductSellerCompany);
            } else {
                return res.status(400).send("Product_SellerCompany couldn't be updated.");
            }
        } else {
            return res.status(400).send("SellerCompany not found.");
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteVersionOfProduct = async (req, res) => {

    try {
        const currentUserId = res.locals.user.id;
        const currentSellerCompany = await SellerCompany.findOne({
            where: {
                userId: currentUserId
            }
        });

        if (currentSellerCompany) {

            // Es decir si el registro que buscamos, está en la lista de esta empresa, nos dejará.
            const productSellerCompanyToDelete = await Product_SellerCompany.findByPk(req.params.productSellerCompanyId);

            if (!productSellerCompanyToDelete) {
                return res.status(404).send("Product_SellerCompany not found.");
            }

            // Verificar que la entrada pertenezca a la empresa actual
            if (productSellerCompanyToDelete.sellerCompanyId !== currentSellerCompany.id) {
                return res.status(401).send("You are not allowed to delete this Product_SellerCompany.");
            }

            // Borrar la entrada en Product_SellerCompany
            const deletedProductSellerCompany = await productSellerCompanyToDelete.destroy()

            if (deletedProductSellerCompany) {
                return res.status(200).json("Aux product Table was deleted successfully.");

            } else {

                return res.status(400).send("Product_SellerCompany couldn't be updated.");
            }

        } else {

            return res.status(400).send("SellerCompany not found.");

        }

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }

}

module.exports = {

    getAllProductSellerCompanies,
    createProductSellerCompany,
    updateProductSellerCompany,
    deleteProductSellerCompany,
    getVersionOfProducts,
    createVersionOfProduct,
    updateVersionOfProduct,
    deleteVersionOfProduct

}