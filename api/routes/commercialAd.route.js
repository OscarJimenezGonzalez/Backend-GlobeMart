const router = require('express').Router()

const {
    getAllAds,
    getOneAd,
    createAd,
    updateAd,
    deleteAd,

} = require('../controllers/commercialAd.controller')

const { checkAdmin } = require('../middlewares/authorization.middleware')

router

    .get('/', getAllAds)
    .get('/:commercialAdId', getOneAd)
    .post('/', createAd)
    .put('/:commercialAdId', updateAd)
    .delete('/:commercialAdId', deleteAd)


module.exports = router