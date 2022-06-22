const emailTransporter = require("../config/email.config");
const EmailUtils = {}

EmailUtils.wrappedSendMail = async(data) => {
    return new Promise((resolve, reject) => {
        emailTransporter.sendMail(data, (error, info) => {
            if(error) resolve(false)
            else resolve(true)
        })
    })
}
module.exports = EmailUtils