const dbconfig = require("../config/db.config")

var Model = {}

Model.insertBulk = async function({data}){
    try{
        var response = await dbconfig.query("INSERT INTO unskilled_users_for_job (post_id, user_id) VALUES ?", [data])
        return response[0].insertId
    }catch(error){
        console.log(error)
        return undefined
    }
}

module.exports = Model