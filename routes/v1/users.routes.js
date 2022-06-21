const express = require("express")
const usersController = require("../../controllers/users.controller")
const router = express.Router()

router.post("/register", async (req, res) => {
    var result = await usersController.register(req.body)
    res.status(result[0]).json(result[1])
})
router.post("/login", async (req, res) => {
    var result = await usersController.login(req.body)
    res.status(result[0]).json(result[1])
})

module.exports = router