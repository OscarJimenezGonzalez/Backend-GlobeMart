const CartItem = require('../models/cartItem.model.js')

const getAllCartItems = async (req, res) => {

    try {

        const cartItems = CartItem.findAll({ where: req.query })

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

        const cartItem = CartItem.create(req.body)

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

        const cartItem = CartItem.update(req.body, {
            where: {
                id: req.params.cartItemId
            }
        })
        if (cartItem) {
            return res.status(200).json(cartItem)
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

        const cartItem = CartItem.destroy({
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

const createOwnCartItem = async (req, res) => {

    try {




    } catch (error) {



    }


}



module.exports = {

    getAllCartItems,
    createCartItem,
    updateCartItem,
    deleteCartItem,

}