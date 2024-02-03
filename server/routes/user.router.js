const { Router } = require("express");
const { CreateRoom } = require("../db/db.rooms");
const {Signup}=require('../db/db.user');
const userRouter = Router();

userRouter.post('/room/create', async (req, res) => {
    console.log(req.body)
    await CreateRoom({ ...req.body, res });
})

userRouter.post('/signup',async (req,res)=>{
    await Signup({...req.body,res});
})


module.exports = userRouter