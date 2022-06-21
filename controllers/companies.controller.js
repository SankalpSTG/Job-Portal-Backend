const responses = require("../misc/response")
const jwtAuth = require("../misc/jwtauth")
var companiesModel = require("../models/companies.model")
var bcrypt = require("bcrypt")
const { response } = require("express")
var Controller = {}

Controller.register = async function(data){
    try{
        var passwordHash = await bcrypt.hash(data.password, 8)
        const companyId = await companiesModel.insert({emailId: data.email_id, password: passwordHash, name: data.name})
        if(companyId === undefined) return responses.anErrorOccured()
        var accessToken = jwtAuth.signAccessToken({companyId: companyId})
        var refreshToken = jwtAuth.signRefreshToken({companyId: companyId})
        return responses.loginSuccess(accessToken, refreshToken)
    }catch(error){
        console.log(error)
        return responses.anErrorOccured()
    }
}
Controller.login = async function(data){
    try{
        const credentials = await companiesModel.getCredentials({emailId: data.email_id})
        console.log(credentials, data)
        if(credentials === undefined) return responses.invalidEmailOrPassword()
        var passwordMatch = await bcrypt.compare(data.password, credentials.password)
        if(!passwordMatch) return response.invalidEmailOrPassword()
        var accessToken = jwtAuth.signAccessToken({companyId: credentials.serial_id})
        var refreshToken = jwtAuth.signRefreshToken({companyId: credentials.serial_id})
        return responses.loginSuccess(accessToken, refreshToken)
    }catch(error){
        console.log(error)
        return responses.anErrorOccured()
    }
}


module.exports = Controller