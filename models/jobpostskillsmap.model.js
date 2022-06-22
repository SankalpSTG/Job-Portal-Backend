const dbconfig = require("../config/db.config")

var Model = {}

Model.insertBulk = async function(data){
    try{
        var response = await dbconfig.query("INSERT INTO job_post_skills_map (post_id, skill_id) VALUES ?", [data])
        return response[0].affectedRows === 0
    }catch(error){
        console.log(error)
        return true
    }
}
Model.delete = async function({postId, skillId}){
    try{
        var response = await dbconfig.query("DELETE FROM job_post_skills_map WHERE post_id = ? AND skill_id = ?", [postId, skillId])
        return response[0].affectedRows === 0
    }catch(error){
        console.log(error)
        return true
    }
}
Model.getSkillsOfPostId = async function({postId}){
    try{
        var [rows, fields] = await dbconfig.query("SELECT skill_id FROM job_post_skills_map WHERE post_id = ?", [postId])
        return rows
    }catch(error){
        console.log(error)
        return []
    }
}
module.exports = Model
