const cron = require('node-cron');
const jobPostingsModel = require("../models/jobpostings.model")
const jobPostSkillsMap = require("../models/jobpostskillsmap.model")
const usersSkillsMap = require("../models/usersskillsmap.model")
const jobNotificationsModel = require("../models/jobnotifications.model")
const unskilledUsersForJobModel = require("../models/unskilledusersforjob.model")
const usersModel = require("../models/users.model")

cron.schedule("*/30  * * * * *", async (now) => {
    try{
        var date = new Date().getTime() / 1000
        var job = await jobPostingsModel.getOldestUnnotifiedJobPosting()
        var requiredSkills = await jobPostSkillsMap.getSkillsOfPostId({postId: job.post_id})
        var skills = requiredSkills.map(value => {
            return value.skill_id
        })
        var users = await usersModel.getUnnotifiedSkilledUsersForPost({postId: job.post_id, companyId: job.company_id, skills: skills})
        var unskilled = []
        var skilled = []
        for(var i = 0; i < users.length; i++){
            var user = users[i]
            var userSkillsResult = await usersSkillsMap.getSkillsOfUser({userId: user.serial_id})
            var userSkills = userSkillsResult.map(value => {
                return value.skill_id
            })
            matchingSkills = skills.filter(value => userSkills.includes(value));
            skillsMatchRatio = (matchingSkills.length * 100) / skills.length
            if(skillsMatchRatio < 30) unskilled.push([job.post_id, user.serial_id])
            else skilled.push([job.post_id, user.serial_id, date, job.company_id])
            console.log(skillsMatchRatio)
        }
        if(unskilled.length > 0) unskilledUsersForJobModel.insertBulk({data: unskilled})
        if(skilled.length > 0) jobNotificationsModel.insertBulk({data: skilled})
    }catch(error){
        console.log(error)
    }
})
