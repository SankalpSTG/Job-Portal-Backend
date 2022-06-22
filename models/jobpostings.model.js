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
Model.getOldestUnnotifiedJobPosting = async function(){
    try{
        var [rows, fields] = await dbconfig.query("SELECT jp.serial_id AS post_id, jp.title AS post_title, jp.description AS post_description, jp.company_id AS company_id FROM job_postings jp WHERE notified_to_all = 0 ORDER BY serial_id ASC LIMIT 1")
        return rows[0]
    }catch(error){
        console.log(error)
        return undefined
    }
}
module.exports = Model
