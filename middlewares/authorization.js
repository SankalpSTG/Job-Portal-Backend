var jwt = require("jsonwebtoken")
const responses = require("../misc/response")

var Authorization = {}

Authorization.authorizeJWTUser = async function(req, res, nex){
    try{
        var auth = req.headers.authorization.split(" ")[1]
        var data = await jwt.decode(auth)
        if(data.companyId != null) return res.status(403).send(responses.requireLogin()[1])
        req.body.userId = data.userId
        nex()
    }catch(err){
        res.status(403).send(responses.anErrorOccured()[1])
    }
}
Authorization.authorizeJWTCompany = async function(req, res, nex){
    try{
        var auth = req.headers.authorization.split(" ")[1]
        var data = await jwt.decode(auth)
        if(data.companyId == null) return res.status(403).send(responses.requireLogin()[1])
        req.body.companyId = data.companyId
        nex()
    }catch(err){
        res.status(403).send(responses.anErrorOccured()[1])
    }
}

module.exports = Authorization