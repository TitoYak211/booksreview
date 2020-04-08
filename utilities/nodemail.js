const nodemailer = require('nodemailer');

const sendMail = async emailSendingOptions => {
    // Mail sending service e.g gmail that sends the email
    const emailTransporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    // Define sending email properties
  const emailOptions = {
    from: 'Tito Yak <yaktito20@gmail.com>',
    to: emailSendingOptions.email,
    subject: emailSendingOptions.subject,
    text: emailSendingOptions.message
  };
    
    // Send email
    await emailTransporter.sendMail(emailOptions);
}

module.exports = sendMail;