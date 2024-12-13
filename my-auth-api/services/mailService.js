// /src/services/mailService.js
const nodemailer = require('nodemailer');
const { emailHost, emailPort } = require('../config');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendMail(to, subject, text) {
    const mailOptions = {
      from: 'no-reply@myapp.com',
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
    } catch (err) {
      console.error('Error sending email:', err);
    }
  }
}

module.exports = new MailService();
