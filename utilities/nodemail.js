const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Tito Yak <${process.env.EMAIL_FROM}>`;
  };

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return 1;
    };

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD
      }
    });
  };

  // Send the actual email
  async send(template, subject) {
    // Render template
    const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    // Email options
    const emailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    // Create a transport and send email
    await this.newTransport().sendMail(emailOptions);
  };

  async sendWelcome() {
    await this.send('welcome', 'Welcome to a reading journey!!')
  };

  async sendPasswordReset() {
    await this.send('passwordReset', 'Your password rest token is valid for only 10 minutes');
  };
}