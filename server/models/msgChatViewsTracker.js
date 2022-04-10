const { mongoose, Schema } = require('mongoose')
const msgChatViewsTrackerSchema = mongoose.model({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    msgId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: { createdAt: true, updatedAt: false }
})
const MsgChatViewsTracker = mongoose.model("MsgChatViewsTracker", msgChatViewsTrackerSchema)
module.exports = MsgChatViewsTracker;