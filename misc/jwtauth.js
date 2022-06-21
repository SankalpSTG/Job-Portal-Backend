const jwt = require("jsonwebtoken")

var jwtAuth = {}

jwtAuth.signAccessToken = (data) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN, {expiresIn: "10h"})
}
jwtAuth.signRefreshToken = (data) => {
    return jwt.sign(data, process.env.REFRESH_TOKEN, {expiresIn: "7d"})
}
jwtAuth.decodeAccessToken = (data) => {
    try{
        return jwt.verify(data, process.env.ACCESS_TOKEN)
    }catch(error){
        return undefined
    }
}
jwtAuth.decodeRefreshToken = (data) => {
    try{
        return jwt.verify(data, process.env.REFRESH_TOKEN)
    }catch(error){
        return undefined
    }
}

module.exports = jwtAuth