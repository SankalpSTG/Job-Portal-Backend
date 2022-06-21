const dbconfig = require("../config/db.config")

var Model = {}

Model.insert = async function({emailId, password, name}){
    try{
        var response = await dbconfig.query("INSERT INTO companies (email_id, password, name) VALUES (?, ?, ?)", [emailId, password, name])
        return response[0].insertId
    }catch(error){
        console.log(error)
        return undefined
    }
}
Model.getCredentials = async function({emailId}){
    try{
        var [rows, fields] = await dbconfig.query("SELECT serial_id, password FROM companies WHERE email_id = ?", [emailId])
        return rows[0]
    }catch(error){
        return undefined
    }
}
module.exports = Model
