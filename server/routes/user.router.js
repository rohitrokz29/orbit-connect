const { Router } = require("express");
const { CreateRoom } = require("../db/db.rooms");
const { Signup, Signin, SignOut } = require('../db/db.user');
const { UserAuth } = require("../middlewares/user.auth");
const { SendMail } = require("../middlewares/mail");
const userRouter = Router();

userRouter.post('/room/create', UserAuth, CreateRoom);

userRouter.post('/signup', Signup);

userRouter.post('/signin', Signin);

userRouter.delete('/signout', UserAuth, SignOut);

module.exports = userRouter