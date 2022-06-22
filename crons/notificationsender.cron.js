const cron = require('node-cron');
const jobPostingsModel = require("../models/jobpostings.model")
const jobPostSkillsMap = require("../models/jobpostskillsmap.model")
const usersSkillsMap = require("../models/usersskillsmap.model")
const jobNotificationsModel = require("../models/jobnotifications.model")
const unskilledUsersForJobModel = require("../models/unskilledusersforjob.model")
const usersModel = require("../models/users.model")
const emailTransporter = require("../config/email.config");
const emailBodyHelper = require("../misc/emailbodyhelper")

cron.schedule("*/30  * * * * *", async (now) => {
    try{
        var unsentNotificationsData = await jobNotificationsModel.getUnsentNotificationsWithData()
        console.log(unsentNotificationsData)
        var sent = []
        for(var i = 0; i < unsentNotificationsData.length; i++){
            const mailData = {
                from: "alert@jobnotifier.com",
                to: [unsentNotificationsData[i].user_email],
                subject: "Job Alerts!",
                text: emailBodyHelper.createPostAlertBody({company: "Test", title: unsentNotificationsData[i].job_title, description: unsentNotificationsData[i].job_description, username: unsentNotificationsData[i].user_name})
            }
            
            emailTransporter.sendMail(mailData, ((error, info) => {
                if(error){
                    console.log(error)
                }else{
                    sent.push(this.unsentNotificationsData[i].notification_id)
                }
            }).bind(this))
        }

    }catch(error){
        console.log(error)
    }
})
// const mailData = {
//             from: 'crm-notification-service@gmail.com',
//             to: notification.recepientEmails,
//             subject: notification.subject,
//             text: notification.content
            
//         }