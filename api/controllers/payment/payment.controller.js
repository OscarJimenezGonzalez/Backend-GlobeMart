require("dotenv").config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' })

const createPayment = async (req, res) => {

    try {

        let { amount } = req.body;
        amount = Math.round(amount * 100)
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
            // payment_method,
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