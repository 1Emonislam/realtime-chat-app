const { mongoose, Schema } = require('mongoose')
const invitationSchema = mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    inviter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    token: {
        type: String,
    },
    shortCode: {
        type: String
    }
})
const Invitation = mongoose.model('Invitation', invitationSchema)
module.exports = Invitation;