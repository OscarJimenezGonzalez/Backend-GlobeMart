import { stripe } from "../../../database"

const createPayment = async (req, res) => {

    const { amount } = req.body

    try {

        const paymentIntent = await stripe.paymentIntents.create({

            amount: amount,
            currency: 'eur',

        });

        res.send({
            clientSecret: paymentIntent.client_secret
        })

    } catch (error) {

        res.status(400).send({ error: error.message })

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