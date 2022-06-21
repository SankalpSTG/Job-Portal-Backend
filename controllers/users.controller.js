const responses = require("../misc/response")
const jwtAuth = require("../misc/jwtauth")
var usersModel = require("../models/users.model")
var usersSkillsMapModel = require("../models/usersskillsmap.model")
var bcrypt = require("bcrypt")
const { response } = require("express")
var Controller = {}

Controller.register = async function(data){
    try{
        var passwordHash = await bcrypt.hash(data.password, 8)
        const userId = await usersModel.insert({emailId: data.email_id, password: passwordHash, name: data.name, dob: data.dob, hometown: data.hometown, address: data.address})
        if(userId === undefined) return responses.anErrorOccured()
        var accessToken = jwtAuth.signAccessToken({userId: userId})
        var refreshToken = jwtAuth.signRefreshToken({userId: userId})
        return responses.loginSuccess(accessToken, refreshToken)
    }catch(error){
        console.log(error)

        return responses.anErrorOccured()
    }
}
Controller.login = async function(data){
    try{
        const credentials = await usersModel.getCredentials({emailId: data.email_id})
        console.log(credentials, data)
        if(credentials === undefined) return responses.invalidEmailOrPassword()
        var passwordMatch = await bcrypt.compare(data.password, credentials.password)
        if(!passwordMatch) return response.invalidEmailOrPassword()
        var accessToken = jwtAuth.signAccessToken({userId: credentials.serial_id})
        var refreshToken = jwtAuth.signRefreshToken({userId: credentials.serial_id})
        return responses.loginSuccess(accessToken, refreshToken)
    }catch(error){
        console.log(error)
        return responses.anErrorOccured()
    }
}
Controller.addSkill = async function(data){
    try{
        var insertId = await usersSkillsMapModel.insert({userId: data.userId, skillId: data.skill_id})
        if(insertId === undefined) return responses.anErrorOccured()
        return responses.success()
    }catch(error){
        console.log(error)
        return responses.anErrorOccured()
    }
}


module.exports = Controller