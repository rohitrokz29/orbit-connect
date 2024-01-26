//* without dotenv config here it woulf deny ecces to database  as it would get the host and password undefined
require('dotenv').config()
const mysql = require('mysql');

const database = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})
const connectDatabase = () => {
    // try {
    //     database.connect(err => {
    //         if (err) {
    //             console.log(err.message)
    //             throw err;
    //         }
    //         console.log(`Database Connected thread id : ${database.threadId}`);
    //     })
    // } catch (error) {
    //     console.log(error.message)
    // }
}
module.exports = {
    connectDatabase,
    database
}

