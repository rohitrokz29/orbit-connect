const { nanoid } = require('nanoid');
const { database } = require('./db.connect');
const { validate } = require('email-validator');
const bcrypt = require('bcrypt');
const { CreateToken } = require('../middlewares/token');
const cookieEncrypter = require('cookie-encrypter');

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    signed: true,
    // secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + 24 * 3600 * 1000)
};
/**
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @param {Object} res
 */
const Signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        console.log({ name, email, password });
        console.log(validate(email));
        if (!validate(email)) {
            return res.status(406).json({ message: "Use a valid email" });
        }
        if (!password || !name) {
            return res.status(406).json({ message: "Invalid Information" })
        }

        bcrypt.hash(password, +process.env.BCRYPT_SALT_ROUNDS, (err, hash) => {
            if (err) throw Error(err);
            const id = nanoid(50);
            database.query("INSERT INTO user VALUES (?,?,?,?);",
                [id, email, name, hash],
                (err, result) => {
                    console.log(err)
                    console.log(result)
                    if (err) {
                        return res.status(400).json({ message: "Email Already Exist" });
                    }
                    if (result?.affectedRows !== 1) {
                        return res.status(400).json({ message: "Server Error" });
                    }
                    console.log(result)

                    return res
                        .cookie('accessToken', CreateToken({ id }), cookieOptions)
                        .status(200)
                        .json({ id });
                }
            )
        })
    } catch (error) {
        return res.json({ message: "ERROR" });
        console.log(error)
    }
}


/**
 * 
 * @param {String} email
 * @param {String} password
 * @param {Object} res
 */
const Signin = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log({ email, password });
        if (!email && !password) {
            return res.status(400).json({ message: "Invalid Details" });
        }
        database.query(`SELECT name,id,password FROM user WHERE email='${email}';`,
            (error, result) => {
                if (error || result.length === 0) {
                    return res.status(404).json({ message: "You have Not signed up yet!" });
                }
                console.log(result)
                if (bcrypt.compare(password, result[0]?.password)) {
                    console.log("done")
                    const token = CreateToken({ id: result[0].id })
                    return res
                        .cookie("accessToken", token, cookieOptions)
                        .status(200)
                        .json({ id: result[0].id, name: result[0].name });
                }
                return res.status(400).json({ message: "Wrong Password" })
            })

    } catch (error) {
        return res.status(500).json({ message: "Server Error" });
    }
}

const SignOut = async (req, res) => {
    try {
        return res
            .clearCookie('accessToken')
            .status(200)
            .json({ message: "Successfully Logged Out" });
    } catch (error) {
        return res.status(400).json({ message: "Logout Failed" });
    }
}

module.exports = {
    Signup,
    Signin,
    SignOut
}