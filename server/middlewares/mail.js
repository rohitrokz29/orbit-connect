const nodemailer = require('nodemailer');
const { database } = require('../db/db.connect');


const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

/**
 * 
 * @param {String} email
 * @param {String} room
 * @param {String} password
 */

//TODO: ERROR DURING SENDDING EMAIL
const SendMail = ({ organiser, room, password, date }) => {
    console.log("SEND MAIL")
    database.query("SELECT email FROM user WHERE id=?",
        [organiser],
        (err, result) => {
            if (err) throw err;
            const mailOptions = {
                from: process.env.NODEMAILER_USER,
                to: result?.email,
                subject: 'Orbit Connect',
                text: `Dear User,<br> Your Session has been booked. <br> <b>Conference ID: </b>${room} <br><b>Conference Password: </b>${password}<br><b>Date:</b> ${new Date(date).toISOString()}<br>Thank You,<br>Orbit Connect`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error:', error);
                    return process.exit(1);
                }
                console.log('Email sent:', info.response);
            });
        }
    )

}

module.exports = {
    SendMail
}