const config = require("../config");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(config.smtp);

const sendEmail = async (data) => {
    if(!data.to || !data.subject)
        return false;
    
    data = { ...data, from: config.smtp.auth.user };
    console.log(data)
    return new Promise((resolve, reject) => {
        transporter.sendMail(data, (error, info) => {
            if(error)
                reject(error)
            else {
                resolve(info)
            }
        });
    })
}

module.exports = sendEmail;