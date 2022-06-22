const EmailBodyHelper = {}

EmailBodyHelper.createPostAlertBody = ({company, title, description, username}) =>{
    return `Hi, ${username}, ${company} is looking to hire for ${title}. Job Description: ${description}. Your skills match with this job. Apply now!`
}

module.exports = EmailBodyHelper