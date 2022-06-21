const responses = require("../misc/response")
var skillsModel = require("../models/skills.model")
var Controller = {}

Controller.getAllSkills = async function(){
    try{
        var skills = await skillsModel.getAllSkills()
        return responses.successData(skills)
    }catch(error){
        return responses.anErrorOccured()
    }
}


module.exports = Controller