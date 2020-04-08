const nodemailer = require('nodemailer');

const sendMail = async options => {
    // Mail sending service e.g gmail
    const mailer = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    });

    // Define sending email properties
  const mailOptions = {
    from: 'Tito Yak <yaktito20@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
    
    // Send email
    await mailer.sendMail(mailOptions);
}
