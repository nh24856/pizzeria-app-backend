const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (email, password) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: ' Your Pizzera app Account Credentials',
        text: `Your account has been created. Your password is: ${password}`
    });
};

module.exports = sendEmail;
