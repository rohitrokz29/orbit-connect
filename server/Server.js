const express = require('express');
const dotenv = require('dotenv');
const { createServer, request } = require('node:http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cookieEncrypter = require('cookie-encrypter');
const cors = require('cors');
const { connectDatabase } = require('./db/db.connect');
const { Connection } = require('./socketMethods/Connection');
const { StartRoom, JoinRoom } = require('./db/db.rooms');


dotenv.config({ path: __dirname + "./.env" })
const app = express();
app.use(bodyParser.json());


app.use(cors({
    origin: process.env.ACCESS_ORIGIN,
    credentials: true,
    sameSite: "none",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
}
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_ENCRYPT_SECRET.toString()));
app.use(cookieEncrypter(process.env.COOKIE_ENCRYPT_SECRET.toString()));


app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", process.env.ACCESS_ORIGIN.toString());
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    next();
});

const socketServer = createServer(app);
const io = new Server(socketServer, {
    cors: { origin: process.env.ACCESS_ORIGIN }
});

app.use('/', require('./routes/user.router'))


app.get('/', (req, res) => {
    // console.log(io)
    res.json({ socketServer });
})

/**
 * TODO
 * Check roomid and password from database befor joining the meet and all other detils and add auth for socket
 */
io.on('connection', Connection);

socketServer.listen(process.env.HOST_PORT, () => {
    connectDatabase();
    console.log('Running at port 3000');
})
