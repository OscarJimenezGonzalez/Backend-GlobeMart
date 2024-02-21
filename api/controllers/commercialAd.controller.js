const CommercialAd = require('../models/commercialAd.model')

const getAllAds = async (req, res) => {
    try {
        const commercialAds = await CommercialAd.findAll({ where: req.query })
        if (commercialAds) {
            return res.status(200).json(commercialAds)
        } else {
            return res.status(404).send("commercialAd not found")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getOneAd = async (req, res) => {
    try {
        const commercialAd = await CommercialAd.findByPk(req.params.commercialAdId)
        if (commercialAd) {
            return res.status(200).json(commercialAd)
        } else {
            return res.status(404).send("commercialAd not found")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const createAd = async (req, res) => {
    try {

        const { imageURL, title, description } = req.body

        const commercialAd = await CommercialAd.create({
            imageURL,
            title,
            description
        })

        if (commercialAd) {
            return res.status(200).json(commercialAd)
        } else {
            return res.status(404).send("commercialAd not created")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateAd = async (req, res) => {
    try {
        const commercialAd = await CommercialAd.update(req.body, {
            where: {
                id: req.params.commercialAdId
            }
        })
        if (commercialAd) {
            return res.status(200).json({ message: "commercialAd updated" })
        } else {
            return res.status(404).send("commercialAd not found")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteAd = async (req, res) => {
    try {
        const commercialAd = await CommercialAd.destroy({
            where: {
                id: req.params.commercialAdId
            }
        })
        if (commercialAd) {
            return res.status(200).json({ message: "commercialAd deleted" })
        } else {
            return res.status(404).send("commercialAd not found")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllAds,
    getOneAd,
    createAd,
    updateAd,
    deleteAd,

}