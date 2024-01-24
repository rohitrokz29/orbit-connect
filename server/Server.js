const express = require('express');

const { createServer, request } = require('node:http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const { connectDatabase } = require('./db/db.connect');
const { Connection } = require('./socketMethods/Connection');


const app = express();
app.use(require('cors')())
app.use(express.urlencoded());

app.use(bodyParser.json());
const socketServer = createServer(app);
const io = new Server(socketServer, {
    cors: { origin: 'http://localhost:5173' }
});

app.use('/',require('./routes/user.router'))
app.get('/', (req, res) => {
    // console.log(io)
    res.json({ socketServer });
})

/**
 * TODO
 * Check roomid and password from database befor joining the meet and all other deti s
 */
io.on('connection', socket => {
    console.log(socket.id);
    socket.on('room:start', ({ room, organiser, password }) => {
        
        if (room !== roomId && password !== roomPassword) {
            socket.emit("room:error", { message: "Wrong Details" })
        }
        socket.join(room);
        socket.broadcast.to(room).emit("room:start", { message: "Meet Started" });
    })
    socket.on('room:join', ({ room, password, user }) => {
        if (room !== roomId && password !== roomPassword) {
            socket.emit("room:error", { message: "Wrong Details" })
        }
        socket.join(room);
        socket.broadcast.to(room).emit("room:new_user", { user })
    })
    socket.on('room:message', ({ room, message, user }) => {
        socket.broadcast.to(room).emit('room:message', { message, user })
    })
});

socketServer.listen(3000, () => {
    connectDatabase();
    console.log('Running at port 3000');
})
