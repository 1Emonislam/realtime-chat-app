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
        question: {
            icon: {
                type: String,
            },
            count: {
                type: Number,
                default: 0
            }
        },
        confused: {
            icon: {
                type: String,
            },
            count: {
                type: Number,
                default: 0
            }
        },
        audio: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UploadFiles"
        }],
        video: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UploadFiles"
        }],
        others: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UploadFiles"
        }],
        images: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "UploadFiles"
        }],
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