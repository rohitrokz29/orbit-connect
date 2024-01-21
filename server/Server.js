const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = require('express')();
app.use(require('cors')())

const socketServer=createServer(app);
const io=new Server(socketServer,{
    cors:{origin:'http://localhost:5173'}
});

app.get('/',(req,res)=>{
    // console.log(io)
    res.json({socketServer});
})
io.on('connection',(socket)=>{
    console.log('connected to socket');
    socket.on('io:send_message',(data)=>{
        console.log(data);
        socket.emit('io:recieved_message',{msg:"recieved message"})
    })
})
socketServer.listen(3000,()=>{
    console.log('Running at port 3000');
})
