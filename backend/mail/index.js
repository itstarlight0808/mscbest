const config = require("../config");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(config.smtp);

const sendEmail = async (data) => {
    if(!data.to || !data.subject)
        return false;
    
    data = { ...data, from: config.smtp.auth.user };
    console.log(data)
    transporter.sendMail(data, (error, info) => {
        console.log(error)
    });

    return true;
}

module.exports = sendEmail;