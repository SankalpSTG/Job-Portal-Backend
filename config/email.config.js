const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'sankalppolk123@gmail.com',
        pass: 'fjnmlurfgsmisooy',
    },
    secure: true,
});
