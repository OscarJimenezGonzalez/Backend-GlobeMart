const Order = require('../models/order.model.js')

const getAllOrders = async (req, res) => {

    try {

        const orders = await Order.findAll({ where: req.query })

        if (orders.length > 0) {

            console.log(orders)
            return res.status(200).json(orders)

        }
        else {
            return res.status(400).send("Order Not Found")
        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const getOneOrder = async (req, res) => {

    try {

        const order = await Order.findByPk(req.params.orderId)
        if (order) {
            return res.status(200).json(order)
        }
        else {
            return res.status(400).send("Order couldnt be found.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

const createOrder = async (req, res) => {

    try {

        const order = await Order.create(req.body)

        if (order) {

            return res.status(200).json(order)

        }
        else {

            return res.status(400).send("Order couldnt be created.")

        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const updateOrder = async (req, res) => {

    try {

        const [order] = await Order.update(req.body, {
            where: {
                id: req.params.orderId
            }
        })
        if (order) {
            return res.status(200).json("Order was updated successfully")
        }
        else {
            return res.status(400).send("Order couldnt be updated.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

const deleteOrder = async (req, res) => {

    try {

        const order = await Order.destroy({
            where: {
                id: req.params.orderId
            }
        })
        if (order) {
            return res.status(200).json("Order was deleted Successfully.")
        }
        else {
            return res.status(400).send("Order couldnt be deleted.")
        }

    } catch (error) {

        return res.status(500).send({ message: error.message })

    }

}

// Specific EndPoints 


const createOwnOrder = async (req, res) => {   // Customer 

    try {

        const currentUserId = res.locals.user.id
        const order = await Order.create({
            ...req.body,
            userId: currentUserId
        })

        if (order) {

            return res.status(200).json(order)

        }
        else {

            return res.status(400).send("Order couldnt be created.")

        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const getOwnOrders = async (req, res) => {   // Customer 

    try {

        const currentUserId = res.locals.user.id
        console.log(currentUserId)
        const ownOrders = await Order.findAll({
            where: {

                userId: currentUserId

            }
        })

        if (ownOrders.length > 0) {

            return res.status(200).json(ownOrders)

        }
        else {

            return res.status(400).send("Own Orders couldnt be found.")

        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}

const getAllOwnSellerOrders = async (req, res) => {     // Seller 

    try {



    } catch (error) {


    }

}

module.exports = {

    getAllOrders,
    getOneOrder,
    getOwnOrders,
    createOrder,
    updateOrder,
    deleteOrder,
    createOwnOrder

}