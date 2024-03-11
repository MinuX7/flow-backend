const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
        }
    });

    const sendTestMail =async function()  {
    
        console.log('Inside send test mail');
        const mailOptions = {
            from: 'cosmin.dumitrache7@gmail.com',
            to: 'cosmin.dumitrache7@gmail.com',
            subject: 'Rezervare Creata',
            html: "<b>This is my first email</b>"
            };
        try {
        let result = await transporter.sendMail(mailOptions);
        return true;
        }  catch (err) {
            console.error('Error sending email',err);
            return false;
        }
    }

    module.exports = {sendTestMail}