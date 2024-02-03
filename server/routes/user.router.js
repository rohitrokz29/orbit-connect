const { Router } = require("express");
const { CreateRoom } = require("../db/db.rooms");
const userRouter = Router();

userRouter.post('/room/create', async (req, res) => {
    console.log(req.body)
    await CreateRoom({ ...req.body, res });
})



module.exports = userRouter