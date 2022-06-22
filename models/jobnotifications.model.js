const dbconfig = require("../config/db.config")

var Model = {}

Model.insertBulk = async function({data}){
    try{
        var response = await dbconfig.query("INSERT INTO job_notifications (post_id, user_id) VALUES ?", [data])
        return response[0].insertId
    }catch(error){
        console.log(error)
        return undefined
    }
}

Model.getUnsentNotificationsWithData = async function(){
    try{
        var [rows, fields] = await dbconfig.query("SELECT jn.serial_id AS notification_id, jn.post_id AS post_id, usr.email_id AS user_email, usr.name AS user_name, jp.title AS job_title, jp.description AS job_description FROM job_notifications jn INNER JOIN users usr ON jn.user_id = usr.serial_id INNER JOIN job_postings jp ON jn.post_id = jp.serial_id WHERE jn.is_sent = 0")
        // var [rows, fields] = await dbconfig.query("SELECT, jn.serial_id AS notification_id, jn.post_id AS post_id, jp.title AS job_title, jp.description AS job_description FROM job_notifications jn INNER JOIN job_postings jp ON jp.serial_id = jn.post_id INNER JOIN users usr ON usr.serial_id = jn.post_id WHERE jn.is_sent = 0")
        return rows
    }catch(error){
        console.log(error)
        return []
    }
}
Model.markNotificationsAsSent = async function({notificationIds}){
    try{
        var [rows, fields] = await dbconfig.query("UPDATE job_notifications SET is_sent = 1 WHERE serial_id IN (?)", [notificationIds])
        // var [rows, fields] = await dbconfig.query("SELECT, jn.serial_id AS notification_id, jn.post_id AS post_id, jp.title AS job_title, jp.description AS job_description FROM job_notifications jn INNER JOIN job_postings jp ON jp.serial_id = jn.post_id INNER JOIN users usr ON usr.serial_id = jn.post_id WHERE jn.is_sent = 0")
        return rows
    }catch(error){
        console.log(error)
        return []
    }
}
module.exports = Model