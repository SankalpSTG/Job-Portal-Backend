const cron = require('node-cron');
const jobNotificationsModel = require("../models/jobnotifications.model")
const emailBodyHelper = require("../misc/emailbodyhelper")
const emailUtils = require("../misc/emailutils")

cron.schedule("*/30  * * * * *", async function (now){
    try{
        var unsentNotificationsData = await jobNotificationsModel.getUnsentNotificationsWithData()
        console.log(unsentNotificationsData)
        var sentIds = []
        var lastIndex = 0
        for(var i = 0; i < unsentNotificationsData.length; i++){
            const mailData = {
                from: "alert@jobnotifier.com",
                to: [unsentNotificationsData[i].user_email],
                subject: "Job Alerts!",
                text: emailBodyHelper.createPostAlertBody({company: unsentNotificationsData[i].company_name, title: unsentNotificationsData[i].job_title, description: unsentNotificationsData[i].job_description, username: unsentNotificationsData[i].user_name})
            }
            var emailSent = await emailUtils.wrappedSendMail(mailData)
            if(emailSent) sentIds.push(unsentNotificationsData[i].notification_id)
        }
        if(sentIds > 0) jobNotificationsModel.markNotificationsAsSent({notificationIds: sentIds})
    }catch(error){
        console.log(error)
    }
})