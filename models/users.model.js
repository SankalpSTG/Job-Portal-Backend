const dbconfig = require("../config/db.config")

var Model = {}

Model.insert = async function({emailId, password, name, dob, hometown, address}){
    try{
        var response = await dbconfig.query("INSERT INTO users (email_id, password, name, dob, hometown, address) VALUES (?, ?, ?, ?, ?, ?)", [emailId, password, name, dob, hometown, address])
        return response[0].insertId
    }catch(error){
        console.log(error)
        return undefined
    }
}
Model.getCredentials = async function({emailId}){
    try{
        var [rows, fields] = await dbconfig.query("SELECT serial_id, password FROM users WHERE email_id = ?", [emailId])
        return rows[0]
    }catch(error){
        return undefined
    }
}
Model.getUnnotifiedSkilledUsersForPost = async function({postId, skills}){
    try{
        var [rows, fields] = await dbconfig.query("SELECT usr.serial_id AS serial_id, usr.email_id AS email_id, usr.name AS name FROM users usr WHERE usr.serial_id IN (SELECT DISTINCT usm.user_id FROM users_skills_map usm WHERE usm.skill_id IN (?)) AND usr.serial_id NOT IN (SELECT jn.user_id FROM job_notifications jn WHERE jn.post_id = ?) AND usr.serial_id NOT IN (SELECT uufj.user_id FROM unskilled_users_for_job uufj WHERE uufj.post_id = ?)", [skills, postId, postId])
        return rows
    }catch(error){
        console.log(error)
        return []
    }
}
module.exports = Model
