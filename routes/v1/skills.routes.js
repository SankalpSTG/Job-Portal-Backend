const express = require("express")
const skillsController = require("../../controllers/skills.controller")
const router = express.Router()

router.get("/getallskills", async (req, res) => {
    var result = await skillsController.getAllSkills()
    res.status(result[0]).json(result[1])
})

module.exports = router