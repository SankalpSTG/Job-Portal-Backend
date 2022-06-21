const responses = require("../misc/response")
const jwtAuth = require("../misc/jwtauth")
var usersModel = require("../models/users.model")
var usersSkillsMapModel = require("../models/usersskillsmap.model")
var jobPostSkillsMapModel = require("../models/jobpostskillsmap.model")
var jobPostingsModel = require("../models/jobpostings.model")
var bcrypt = require("bcrypt")
const { response } = require("express")
var Controller = {}

Controller.addJob = async function(data){
    try{
        var postId = await jobPostingsModel.insert({title: data.title, description: data.description, companyId: data.companyId})
        if(postId === undefined) return responses.anErrorOccured()
        mapData = data.skills.map(value => {
            return [postId, value]
        })
        var error = await jobPostSkillsMapModel.insertBulk(mapData)
        if(error) return responses.anErrorOccured()
        return responses.success()
    }catch(error){
        console.log(error)
        return responses.anErrorOccured()
    }
}
module.exports = Controller