const dbconfig = require("../config/db.config")

var Model = {}

Model.insertBulk = async function({data}){
    try{
        console.log(data)
        var response = await dbconfig.query("INSERT INTO job_notifications (post_id, user_id, created_at, company_id) VALUES ?", [data])
        return response[0].insertId
    }catch(error){
        console.log(error)
        return undefined
    }
}

Model.getUnsentNotificationsWithData = async function(){
    try{
        var limitTime = (new Date().getTime() / 1000 ) - 86400
        var [rows, fields] = await dbconfig.query("SELECT jn.serial_id AS notification_id, jn.post_id AS post_id, usr.email_id AS user_email, usr.name AS user_name, jp.title AS job_title, jp.description AS job_description, cmp.name as company_name FROM job_notifications jn INNER JOIN users usr ON jn.user_id = usr.serial_id INNER JOIN job_postings jp ON jn.post_id = jp.serial_id INNER JOIN companies cmp ON jn.company_id = cmp.serial_id WHERE jn.is_sent = 0 AND (SELECT COUNT(jn2.serial_id) FROM job_notifications jn2 WHERE jn2.user_id = jn.user_id AND jn.sent_at > ?) < 3 AND jn.company_id NOT IN (SELECT jn3.company_id FROM job_notifications jn3 WHERE jn3.user_id = jn.user_id AND jn3.sent_at > ?)", [limitTime, limitTime])
        // var [rows, fields] = await dbconfig.query("SELECT, jn.serial_id AS notification_id, jn.post_id AS post_id, jp.title AS job_title, jp.description AS job_description FROM job_notifications jn INNER JOIN job_postings jp ON jp.serial_id = jn.post_id INNER JOIN users usr ON usr.serial_id = jn.post_id WHERE jn.is_sent = 0")
        return rows
    }catch(error){
        console.log(error)
        return []
    }
}
Model.markNotificationsAsSent = async function({notificationIds}){
    try{
        var currentTime = new Date().getTime() / 1000
        var [rows, fields] = await dbconfig.query("UPDATE job_notifications SET is_sent = 1, sent_at = ? WHERE serial_id IN (?)", [currentTime, notificationIds])
        // var [rows, fields] = await dbconfig.query("SELECT, jn.serial_id AS notification_id, jn.post_id AS post_id, jp.title AS job_title, jp.description AS job_description FROM job_notifications jn INNER JOIN job_postings jp ON jp.serial_id = jn.post_id INNER JOIN users usr ON usr.serial_id = jn.post_id WHERE jn.is_sent = 0")
        return rows
    }catch(error){
        console.log(error)
        return []
    }
}
module.exports = Model