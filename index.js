require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const addRelationsToModels = require("./database/relations")

const {
    checkConnection,
    syncModels
} = require("./database/index")

async function checkDB() {
    await checkConnection()
    await addRelationsToModels()
    await syncModels()
    // await syncModels("force")
    // await syncModels("alter")

}

function startExpress() {
    const app = express()
        .use(cors())
        .use(morgan('dev'))
        .use(express.json())
        .use('/api', require('./api/routes/index.route'))

        .listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`)
        })
}


; (async function startAPI() {
    await checkDB()
    startExpress()
})()  