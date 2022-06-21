const dbconfig = require("../config/db.config")

var Model = {}

Model.getAllSkills = async function(){
    try{
        var [rows, fields] = await dbconfig.query("SELECT serial_id, skill FROM skills")
        return rows
    }catch(error){
        return []
    }
}
module.exports = Model
