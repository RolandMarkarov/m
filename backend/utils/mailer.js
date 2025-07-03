const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendAdminReport = async (user) => {
  const mailOptions = {
    from: `"Site Notification" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: '📥New User Registred',
    text: `User:\Name: ${user.name}\nEmail: ${user.email}\Date: ${new Date().toLocaleString()}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendAdminReport };