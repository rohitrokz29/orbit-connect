const { database } = require("../db/db.connect")

const UserAuth = (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(400).json({ message: "Signin First" });
        }
        const result = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET)
        if (result) {
            database.query(`SELECT COUNT(id) FROM user WHERE id='${result['id']}';`,
                (err, result) => {
                    if (err || +result[0]['COUNT(id)'] === 0) {
                        return res.status(500).json({ message: "EROR" });
                    }
                    req.id = result['id'];
                    next();
                    return;
                })
        }
        return res.status(401).json({ message: "Access Token expired" });
    } catch (error) {
        return res.status(500).json({ message: "ERROR" });

    }
}
module.exports = {
    UserAuth
}