const { database } = require("../db/db.connect")
const { nanoid } = require("nanoid");

/**
 * @param {Objecy} client
 * @param {String} organiserId
 * @param {Date} date
 * @param {Object} res
 * @returns
 */
const CreateRoom = async ({ organiser, date, res }) => {
    try {
        const room = nanoid(10);
        const password = nanoid(12);
        const formattedDate = date.slice(0, 19).replace('T', ' ');
        console.log({ room, password, formattedDate, organiser, date })
        // console.log({date})
        database.query(`INSERT INTO meetings VALUES('${room}','${formattedDate}','${organiser}','${password}') ;`, (err, result) => {
            // console.log(result)
            console.log(err)
            if (err) res.status(500).json({ message: err.message })
            else if (result?.affectedRows) res.status(200).json({ created: true, message: "Succesfully Booked Session" });
            else res.status(400).json({ message: "Session Booking Failed" })
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" });
    }
}




/**
* @param {Object} client 
* @param {String} organiserId
* @param {String} room 
* @param {String} password
* @param {Object} socket
* @returns 
*/
const StartRoom = async ({ organiserId, room, password, socket }) => {
    try {
        if (socket.adapter.rooms.has(room)) {
            socket.emit('room:error', { message: "Meeting Already Started!" });
            return;
        }
        database.query(`SELECT COUNT(room_id) FROM meetings WHERE room_id=? AND organiser_id=? AND password=?;`,
            [room, organiserId, password],
            (err, result) => {
                console.log(err)
                console.log(result)
                if (err) socket.emit('room:error', { message: err.message })
                if (result?.length > 0) {
                    if (+result[0]['COUNT(room_id)'] === 1) {
                        console.log('START ROOM')
                        console.log(result[0])
                        socket.join(room);
                        socket.broadcast.to(room).emit("room:start", { message: "Meet Started" });
                        return;
                    }
                    socket.emit('room:error', { message: "Wrong Password Or Details" });
                    return;
                }
                socket.emit("room:error", { message: "Meeting Not Started OR Wrong Details" });
            });
    } catch (error) {
        socket.emit('room:error', { message: "Server Error" });
    }
}


/**
* @param {Object} client
* @param {String} user
* @param {String} room 
* @param {String} password
* @param {Object} socket
 @returns 
 */
const JoinRoom = ({ room, password, user, socket }) => {
    try {
        //adapter contains all room in pattaerm of Map<String(ROOMID),Set<String(SOCKET ID)>>
        //checking if meeting started or not
        console.log(socket.adapter.rooms)
        if (!socket.adapter.rooms.has(room)) {
            console.log("ROOM  NOT  FOUND");;;;;
            socket.emit('room:error', { message: "Meeting Not Started Yet!" });
            return;
        }
        database.query(`SELECT COUNT(room_id) FROM meetings WHERE room_id=? AND password=?;`,
            [room, password],
            (err, result) => {
                if (err) socket.emit('room:error', { message: err.message });
                if (result?.length > 0) {
                    //['COUNT(room_id)'] the count(room_id) shoud be same as written in sql query
                    if (+result[0]['COUNT(room_id)'] === 1) {
                        console.log(result[0])
                        socket.join(room);
                        socket.broadcast.to(room).emit("room:new_user", { user })
                        return;
                    }
                    socket.emit('room:error', { message: "Wrong Details" });
                    return;
                }
                socket.emit("room:error", { message: "Meeting Not Started OR Wrong Details" });
            }
        )
    } catch (error) {
        socket.emit('room:error', { message: "Server Error" });
    }
}


module.exports = {
    CreateRoom,
    StartRoom,
    JoinRoom
}