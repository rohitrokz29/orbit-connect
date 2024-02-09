const Connection = (socket) => {
    /**
   * TODO ADD VEDIO CONFERECE FUNCTIONALITY
   */
    console.log(socket.id);
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
    socket.on('room:message', ({ room, message, user }) => {
        try {
            socket.broadcast.to(room).emit('room:message', { message, user });
        } catch (error) {
            socket.emit('room:error', { message: "Message Not Sent" });
        }
    })
    socket.on('room:leave', ({ room }) => {
        try {
            socket.leave(room);
            socket.emit('room:leave', { message: "Conference Left Succesfully" });
        } catch (error) {
            socket.emit('room:error', { message: "Conferece Not Left" });
        }
    })
}

module.exports={Connection}