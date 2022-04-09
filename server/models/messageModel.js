const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    receiver: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    content: {
        text: {
            type: String
        },
        audio: [],
        video: [],
        others: [],
    },
    lastSeen: {
        type: Date,
        default: new Date(),
    },
    seen: {
        type: Boolean,
        required: true,
        default: false,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    }
}, {
    timestamps: true,
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;