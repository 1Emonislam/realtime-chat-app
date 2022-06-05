const jwt = require('jsonwebtoken')
function genToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.AUTH_TOKEN_EXPIRES
    })
}
function genToken_fourHours(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '4h'
    })
}
function genInviteGroup(shortCode, expire) {
    return jwt.sign({shortCode}, process.env.JWT_SECRET, {
        expiresIn: expire || '7d'
    })
}
module.exports = { genToken, genToken_fourHours, genInviteGroup }