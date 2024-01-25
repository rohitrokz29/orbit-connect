const { Router } = require("express");
const { CreateRoom } = require("../db/db.rooms");
const userRouter = Router();
var roomId = "ABC123";
var roomPassword = "Rohit";

userRouter.post('/createRoom', async (req, res) => {
    await CreateRoom({ ...req.body, res });
})
module.exports = userRouter