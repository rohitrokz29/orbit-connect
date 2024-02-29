const nodemailer = require('nodemailer');
const { database } = require('../db/db.connect');

require("dotenv").config();
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

const SendMail = async({ organiser, room, password, date }) => {
    console.log("SEND MAIL")
    console.log(transporter)
    let status=false;
    await database.query("SELECT email FROM user WHERE id=?",
        [organiser],
        (err, result) => {
            console.log(result[0])
            if (err) throw err;
            const mailOptions = {
                from: process.env.NODEMAILER_USER,
                to: result[0].email,
                subject: 'Orbit Connect',
                html: `Dear User,<br> Your Session has been booked. <br> <b>Conference ID: </b>${room} <br><b>Conference Password: </b>${password}<br><b>Date:</b> ${new Date(date).toISOString()}<br>Thank You,<br>Orbit Connect`
            };

            transporter.sendMail(mailOptions)
            .then(info=>{
                status=true;
            })
            .catch((err)=>{
                status=false;
            })
        }
    )
        return status;

}

module.exports = {
    SendMail
}