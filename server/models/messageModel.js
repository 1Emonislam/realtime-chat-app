const { mongoose, Schema } = require('mongoose');
const messageSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    content: {
        text: {
            type: String,
        },
        audio: {
            type: Array,
            default: [],
        },
        video: {
            type: Array,
            default: []
        },
        images: {
            type: Array,
            default: []
        },
        others: {
            type: Array,
            default: []
        },
    },
    lastActive: {
        type: Date,
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