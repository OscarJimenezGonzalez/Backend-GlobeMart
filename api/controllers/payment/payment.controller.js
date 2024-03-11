require("dotenv").config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })

const createPayment = async (req, res) => {

    try {
        const { amount } = req.body;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
            // Puedes agregar más configuraciones de pago si es necesario
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

}

const getPayment = async (req, res) => {


    try {


    } catch (error) {

    }

}


module.exports = {
    createPayment,
    getPayment
}