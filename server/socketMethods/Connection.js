const Connection = (socket) => {

    console.log(socket.id);
    console.log("SOCKET CONNECTED")
    socket.on('room:start', ({ room, userId, password }) => {
        try {
            StartRoom({ room, organiserId: userId, password, socket });
        } catch (error) {
            console.log(error)
            socket.emit("room:error", { message: error.message });
        }
    })
    socket.on('room:join', ({ room, password, user }) => {
        try {
            JoinRoom({ room, password, user, socket });
        } catch (error) {
            console.log(error)
            socket.emit("room:error", { message: error.message });
        }
    })
    socket.on('room:stream', ({ room, user, stream }) => {
        try {
            console.log("stream");
            socket.broadcast.to(room).emit('room:stream', { user, stream });
        } catch (error) {
            socket.emit("room:error", { message: "Stream Error" });
        }
    })
    socket.on('room:message', ({ room, message, user }) => {
        try {
            socket.broadcast.to(room).emit('room:message', { message, user });
        } catch (error) {
            socket.emit('room:error', { message: "Message Not Sent" });
        }
    })
    socket.on('room:leave', ({ room, user }) => {
        try {
            socket.leave(room);
            socket.broadcast.to(room).emit('room:leave', { message: `${user} left` });
        } catch (error) {
            socket.emit('room:error', { message: "Conferece Not Left" });
        }
    })

}

module.exports = { Connection }