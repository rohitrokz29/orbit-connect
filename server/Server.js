const express = require('express');
const dotenv = require('dotenv');
const { createServer, request } = require('node:http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const { connectDatabase } = require('./db/db.connect');
const { Connection } = require('./socketMethods/Connection');
const { StartRoom, JoinRoom } = require('./db/db.rooms');


const app = express();
app.use(require('cors')())
app.use(express.urlencoded());
dotenv.config({ path: __dirname + "./.env" })
app.use(bodyParser.json());
const socketServer = createServer(app);
const io = new Server(socketServer, {
    cors: { origin: 'http://localhost:5173' }
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
io.on('connection', socket => {
    console.log(socket.id);
    socket.on('room:start', ({ room, userId, password }) => {
        try {
            StartRoom({ room, organiserId: userId, password, socket });
        } catch (error) {
            console.log(error)
            socket.emit("room:error", { message: error.message })
        }
    })
    socket.on('room:join', ({ room, password, user }) => {
        try {
            JoinRoom({ room, password, user, socket });
        } catch (error) {
            console.log(error)
            socket.emit("room:error", { message: error.message })
        }
    })
    socket.on('room:message', ({ room, message, user }) => {
        socket.broadcast.to(room).emit('room:message', { message, user })
    })
});

socketServer.listen(3000, () => {
    connectDatabase();
    console.log('Running at port 3000');
})
