const { Router } = require("express");
const { CreateRoom } = require("../db/db.rooms");
const userRouter = Router();
var roomId = "ABC123";
var roomPassword = "Rohit";

userRouter.post('/createRoom', async (req, res) => {
    let createdRoom = await CreateRoom(req.body);
    if (createdRoom) {
        res.status(200).json(createdRoom);
    }
    else res.json({ msg: "NONE" })

})
module.exports = userRouter