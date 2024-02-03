const { nanoid } = require('nanoid');
const { database } = require('./db.connect');
const { validate } = require('email-validator');
const bcrypt = require('bcrypt');
/**
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @param {Object} res
 */
const Signup = async ({ name, email, password, res }) => {
    try {
        console.log({ name, email, password });
        console.log(validate(email));
        if (!validate(email)) {
            return res.status(406).json({ message: "Use a valid email" });
        }
        bcrypt.hash(password, +process.env.BCRYPT_SALT_ROUNDS, (err, hash) => {
            if (err) throw Error(err);
            const id = nanoid(50);
            database.query("INSERT INTO user VALUES (?,?,?,?);",
                [id, email, name, hash],
                (err, result) => {
                    console.log(result)
                    if (err) {
                        return res.status(400).json({ message: "Email Already Exist" });
                    }
                    if (result?.affectedRows !== 1) {
                        return res.status(400).json({ message: "Server Error" });
                    }
                    console.log(result)
                    return res.status(201).json({ id })
                }
            )
        })
    } catch (error) {
        return res.json({ message: "ERROR" });
        console.log(error)
    }
}


module.exports = {
    Signup
}