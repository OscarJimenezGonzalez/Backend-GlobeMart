const Order = require('../models/order.model.js')

const getAllOrders = async (req, res) => {

    try {

        const orders = Order.findAll({ where: req.query })

        if (orders) {
            return res.status(200).json(orders)
        }
        else {
            return res.status(400).send("Order Not Found")
        }

    } catch (error) {

        res.status(500).json({ message: error.message })

    }

}


const createOrder = async (req, res) => {

    try {

        const Order = Order.create(req.body)

        if (Order) {

            return res.status(200).json(Order)

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

        const order = Order.update(req.body, {
            where: {
                id: req.params.OrderId
            }
        })
        if (Order) {
            return res.status(200).json(order)
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

        const order = Order.destroy({
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


    } catch (error) {


    }


}


const getAllOwnOrders = async (req, res) => {   // Customer 

    try {

        if (orders) {

        }
        else {

        }

    } catch (error) {


    }

}

const getAllOwnSellerOrders = async (req, res) => {     // Seller 

    try {



    } catch (error) {


    }

}

module.exports = {

    getAllOrders,
    createOrder,
    updateOrder,
    deleteOrder,

}