const dbconfig = require("../config/db.config")

var Model = {}

Model.insert = async function({title, description, companyId}){
    try{
        var response = await dbconfig.query("INSERT INTO job_postings (title, description, company_id) VALUES (?, ?, ?)", [title, description, companyId])
        return response[0].insertId
    }catch(error){
        console.log(error)
        return undefined
    }
}
Model.getJobById = async function({postId}){
    try{
        var [rows, fields] = await dbconfig.query("SELECT serial_id, title, description, company_id FROM job_postings WHERE serial_id = ?", [postId])
        return rows[0]
    }catch(error){
        return undefined
    }
}
module.exports = Model
