const CartItem = require('../models/cartItem.model.js')
const User = require('../models/user.model.js')
const Order = require('../models/order.model.js')
const Product = require('../models/product.model.js')
const Product_SellerCompany = require('../models/product_sellerCompany.model.js')
const SellerCompany = require('../models/sellerCompany.model.js')

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
                        attributes: ['name', 'model', 'brand', 'imageURL']
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

const updateCartItemListStatus = async (req, res) => {

    try {

        const order = await Order.findByPk(req.params.orderId)

        if (order) {

            const orderId = order.id
            console.log(orderId)

            const cartItems = await CartItem.findAll({
                where: {
                    orderId: orderId
                }
            })

            if (cartItems) {

                for (let i = 0; i < cartItems.length; i++) {


                    const [updatedCartItems] = await CartItem.update(req.body, {
                        where: {
                            id: cartItems[i].id
                        }
                    })

                }

                return res.status(200).json("CartItems were updated successfully.")

            }

        }

    } catch (error) {

        console.log("Coño")
        res.status(500).json({ message: error.message })

    }
}

const getCartItemsFromOrder = async (req, res) => {

    try {

        const order = await Order.findByPk(req.params.orderId)

        if (!order) {
            return res.status(404).send("Order couldn't be found.");
        }

        const orderId = order.id
        const cartItems = await CartItem.findAll({

            where: {
                orderId: orderId
            }, include: [{

                model: Product_SellerCompany,
                attributes: ['price'],
                include:
                    [{
                        model: Product,
                        attributes: ['name', 'model', 'brand', 'imageURL']
                    },

                    {
                        model: SellerCompany,
                        attributes: ['name', 'id']
                    }
                    ]

            }]

        })

        // if (cartItems.length === 0) {

        //     return res.status(404).send("CartItems couldnt be found.")

        // }

        return res.status(200).json(cartItems)

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const getCartItemsFromSellerCompany = async (req, res) => {

    try {

        const cartItems = await CartItem.findAll()
        if (cartItems.length === 0) {
            return res.status(404).send("CartItems Not Found")
        }

        const productsFromSeller = await Product_SellerCompany.findAll({
            where: {
                sellerCompanyId: req.params.sellerCompanyId
            }
        },)

        if (productsFromSeller.length === 0) {
            return res.status(404).json("Products Not Found")
        }

        const productFromSellerIds = productsFromSeller.map(object => object.id)
        console.log(productFromSellerIds)

        const filteredCartItemList = cartItems.filter((cartItem) => productFromSellerIds.includes(cartItem.productSellerCompanyId))

        if (filteredCartItemList === 0) {

            return res.status(404).send("CartItems Not Found")

        }

        return res.status(200).json(filteredCartItemList)

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const getCartItemVerifiedStatus = async (req, res) => {




}


module.exports = {

    getAllCartItems,
    getCartItemsFromOrder,
    getCartItemsFromSellerCompany,
    getCartItemVerifiedStatus,
    asociateCartItemToOrder,
    createCartItem,
    updateCartItem,
    updateCartItemListStatus,
    deleteCartItem,

}

