const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
        user: process.env.NODEMAILER_SERVICE,
        pass: process.env.NODEMAILER_SERVICE
    }
});

const SendMail = ({ email, room, password }) => {

    const mailOptions = {
        from: 'connect@orbit.com',
        to: email,
        subject: 'Orbit Connect',
        text: `Dear User,<br> Your Session has been booked. <br> <b>Conference ID: </b>${room} <br><b>Conference Password: </b>${password}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error:', error);
            process.exit(1);
        }
        console.log('Email sent:', info.response);
    });
}

module.exports = {
    SendMail
}