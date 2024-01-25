const { database } = require("../db/db.connect")
const { nanoid } = require("nanoid");

const CreateRoom = async ({ organiserId, date, res }) => {
    try {
        const room = nanoid(10);
        const password = nanoid(12);
        console.log({ room, password })
        const formattedDate = (new Date(date)).toISOString().slice(0, 19).replace('T', ' ');
        database.query(`INSERT INTO meetings VALUES('${room}','${formattedDate}','${organiserId}','${password}') ;`, (err, result) => {
            console.log(result)
            if (err) res.status(500).json({ message: err.message })
            else if (result?.affectedRows) res.status(200).json({ created: true, message: "Succesfully Booked Session" });
            else res.status(400).json({ message: "Session Booking Failed" })
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

const StartRoom = async ({ organiserId, room, password, socket }) => {
    try {
        database.query(`SELECT room_id, password FROM meetings WHERE room_id=? AND organiser_id=?;`,
            [room, organiserId],
            (err, result) => {
                if (err) socket.emit('room:error', { message: err.message })
                console.log(result)
                if (result.length > 0) {
                    if (result[0].password !== password) {
                        socket.emit('room:error', { message: "Wrong Password" });
                    }
                    else {
                        socket.join(room);
                        socket.broadcast.to(room).emit("room:start", { message: "Meet Started" });
                    }
                }
                else if (!result || +result.length === 0) socket.emit("room:error", { message: "Meeting Not Started OR Wrong Details" });
            });
    } catch (error) {
        return socket.emit('room:error',{message:"Server Error"});
    }
}

module.exports = {
    CreateRoom,
    StartRoom
}