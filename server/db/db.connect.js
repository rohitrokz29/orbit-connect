const mysql = require('mysql');

const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rohit@123457",
    database: "orbit_connect"
})

const connectDatabase = () => {
    try {
        database.connect(err => {
            if (err) {
                throw err;
            }
            console.log(`Database Connected thread id : ${database.threadId}`);
        })
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = {
    connectDatabase,
    database
}

