const dbconfig = require("../config/db.config")

var Model = {}

Model.insert = async function({userId, skillId}){
    try{
        var response = await dbconfig.query("INSERT INTO users_skills_map (user_id, skill_id) VALUES (?, ?)", [userId, skillId])
        return response[0].insertId
    }catch(error){
        console.log(error)
        return undefined
    }
}
Model.delete = async function({userId, skillId}){
    try{
        var response = await dbconfig.query("DELETE FROM users_skills_map WHERE user_id = ? AND skill_id = ?", [userId, skillId])
        return response[0].affectedRows === 0
    }catch(error){
        console.log(error)
        return true
    }
}
Model.getSkillsOfUser = async function({userId}){
    try{
        var [rows, fields] = await dbconfig.query("SELECT skill_id FROM users_skills_map WHERE user_id = ?", [userId])
        return rows
    }catch(error){
        console.log(error)
        return []
    }
}
module.exports = Model
