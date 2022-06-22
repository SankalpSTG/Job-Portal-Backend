require("dotenv").config()
require("./crons/notificationcreator.cron")
require("./crons/notificationsender.cron")
const bodyParser = require("body-parser")
const express = require("express")
const apiRouter = require("./routes/index")
const app = express()

app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use("/api", apiRouter)

app.listen(4000, () => {
    console.log("App has started")
})