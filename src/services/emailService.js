const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  host: config.SMTP.HOST,
  port: config.SMTP.PORT,
  secure: config.SMTP.PORT === 465,
  auth: {
    user: config.SMTP.USER,
    pass: config.SMTP.PASS,
  },
});

const sendEmail = async (subject, htmlBody) => {
  try {
    await transporter.sendMail({
      from: config.SMTP.USER,
      to: config.SMTP.TO,
      subject,
      html: htmlBody,
    });
    console.log(`Email sent successfully to: ${config.SMTP.TO}`);
  } catch (error) {
    console.error('Error while sending email:', error);
  }
};

module.exports = { sendEmail };
