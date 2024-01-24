const { createServer } = require('node:http');
const { Server } = require('socket.io');
const { Connection } = require('./socketMethods/Connection');
const { urlencoded } = require('express');
const bodyParser = require('body-parser');

const app = require('express')();
app.use(require('cors')())
app.use(urlencoded());

app.use(bodyParser.json());
const socketServer = createServer(app);
const io = new Server(socketServer, {
    cors: { origin: 'http://localhost:5173' }
});

app.get('/', (req, res) => {
    // console.log(io)
    res.json({ socketServer });
})

var roomId="ABC123";
var password="Rohit";
io.on('connection', socket=>{
    console.log(socket.id);
    socket.on('room:start',({room,organiser,password})=>{
        socket.join(room);
        socket.broadcast.to(room).emit("room:start",{message:"Meet Started"});
    })
    socket.on('room:join',({room,password,user})=>{
        socket.join(room);
        socket.broadcast.to(room).emit("room:new_user",{user})
    })
    socket.on('room:message',({room,message,user})=>{
        socket.broadcast.to(room).emit('room:message',{message,user})
    })
});

socketServer.listen(3000, () => {
    console.log('Running at port 3000');
})
