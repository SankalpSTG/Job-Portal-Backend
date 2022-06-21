const express = require("express")
const companiesController = require("../../controllers/companies.controller")
const router = express.Router()

router.post("/register", async (req, res) => {
    var result = await companiesController.register(req.body)
    res.status(result[0]).json(result[1])
})
router.post("/login", async (req, res) => {
    var result = await companiesController.login(req.body)
    res.status(result[0]).json(result[1])
})
module.exports = router