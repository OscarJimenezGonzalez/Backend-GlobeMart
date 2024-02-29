const CartItem = require('../models/cartItem.model.js')
const User = require('../models/user.model.js')
const Order = require('../models/order.model.js')
const Product = require('../models/product.model.js')
const Product_SellerCompany = require('../models/product_sellerCompany.model.js')


const getAllCartItems = async (req, res) => {

    try {
        const cartItems = await CartItem.findAll({

            where: req.query,
            include: [{

                model: Product_SellerCompany,
                attributes: ['price'],
                include:
                    [{
                        model: Product,
                        attributes: ['name', 'model', 'brand', 'imgURL']
                    }]
            },
            {
                model: User,
                attributes: ['username', 'email']
            },
            {
                model: Order,
                attributes: ['billNumber']
            }]

        })


        if (cartItems) {
            return res.status(200).json(cartItems)
        }
        else {
            return res.status(400).send("Fligth Not Found")
        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const createCartItem = async (req, res) => {

    try {

        const cartItem = await CartItem.create(req.body)

        if (cartItem) {

            return res.status(200).json(cartItem)

        }
        else {

            return res.status(400).send("CartItem couldnt be created.")

        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}


const updateCartItem = async (req, res) => {

    try {

        const [cartItem] = await CartItem.update(req.body, {
            where: {
                id: req.params.cartItemId
            }
        })
        if (cartItem) {
            return res.status(200).json("CartItem Was successfully updated.")
        }
        else {
            return res.status(400).send("CartItem couldnt be updated.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

const deleteCartItem = async (req, res) => {

    try {

        const cartItem = await CartItem.destroy({
            where: {
                id: req.params.cartItemId
            }
        })
        if (cartItem) {
            return res.status(200).json("CartItem was deleted Successfully.")
        }
        else {
            return res.status(400).send("CartItem couldnt be deleted.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}


// Specific EndPoints

const asociateCartItemToOrder = async (req, res) => {

    try {

        // PENDING 
        const cartItem = await CartItem.create(req.body)

        if (cartItem) {
            return res.status(200).json(cartItem)
        }
        else {

            return res.status(400).send("CartItem couldnt be created.")

        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }


}



module.exports = {

    getAllCartItems,
    asociateCartItemToOrder,
    createCartItem,
    updateCartItem,
    deleteCartItem,

}