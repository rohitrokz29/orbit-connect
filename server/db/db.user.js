const { nanoid } = require("nanoid");
const { database } = require("./db.connect");
const { validate } = require("email-validator");
const bcrypt = require("bcrypt");
const { CreateToken } = require("../middlewares/token");

const cookieOptions = {
  httpOnly: true,
  // secure: true,
  // sameSite: "None",
  // secure: process.env.NODE_ENV === 'production',
  maxAge: 2592000000,
};
/**
 * @param {String} name
 * @param {String} email
 * @param {String} password
 * @param {Object} res
 */
const Signup = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    console.log({ name, email, password });
    console.log(validate(email));
    if (!validate(email)) {
      return res.status(406).json({ message: "Use a valid email" });
    }
    if (!password || !name) {
      return res.status(406).json({ message: "Invalid Information" });
    }
    bcrypt.hash(password, +process.env.BCRYPT_SALT_ROUNDS, (err, hash) => {
      if (err) throw Error(err);
      const id = nanoid(50);
      database.query(
        "INSERT INTO user VALUES (?,?,?,?);",
        [id, email, name, hash],
        (err, result) => {
          console.log(err);
          console.log(result);
          if (err) {
            res.status(400).json({ message: "Email Already Exist" });
            return;
          }
          if (result?.affectedRows !== 1) {
            res.status(400).json({ message: "Server Error" });
            return;
          }
          const token = CreateToken({ id });
          console.log(token);
          res
            .cookie("accessToken", token.accessToken, cookieOptions)
            .status(200)
            .json({ id });
        }
      );
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "ERROR" });
  }
};

/**
 *
 * @param {String} email
 * @param {String} password
 * @param {Object} res
 */
const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    if (!email && !password) {
      return res.status(400).json({ message: "Invalid Details" });
    }
    database.query(
      `SELECT name,id,password FROM user WHERE email='${email}';`,
      async (error, result) => {
        if (error || result.length === 0) {
          return res
            .status(404)
            .json({ message: "You have Not signed up yet!" });
        }
        console.log(result);
        let status = await bcrypt.compare(password, result[0]?.password);
        console.log(status);
        if (!status) {
          res.status(400).json({ message: "Wrong Password" });
          return;
        }
        const token = CreateToken({ id: result[0].id });
        console.log(token);
        res
          .cookie("accessToken", token.accessToken, cookieOptions)
          .status(200)
          .json({ id: result[0].id, name: result[0].name });
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

const SignOut = async (req, res) => {
  try {
    return res
      .clearCookie("accessToken")
      .status(200)
      .json({ message: "Successfully Logged Out" });
  } catch (error) {
    return res.status(400).json({ message: "Logout Failed" });
  }
};

module.exports = {
  Signup,
  Signin,
  SignOut,
};
