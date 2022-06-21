const express = require("express")
const usersRouter = require("./users.routes")
const companiesRouter = require("./companies.routes")
const skillsRouter = require("./skills.routes")
const router = express.Router()

router.use("/companies", companiesRouter)
router.use("/users", usersRouter)
router.use("/skills", skillsRouter)

module.exports = router