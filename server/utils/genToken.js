const jwt = require('jsonwebtoken')
const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.AUTH_TOKEN_EXPIRES
    })
}
module.exports = genToken;