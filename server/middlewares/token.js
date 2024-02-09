const jwt = require("jsonwebtoken");

const CreateToken = ({ id }) => {
    const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '5d' });
    return { accessToken }
}
module.exports = { CreateToken }