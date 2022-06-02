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
        reaction: {
            question: {
                type: String,
                url: 'https://i.ibb.co/7jzqN3F/question.png',
                users: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                }],
                count: {
                    type: Number,
                    default: 0
                },
            },
            confused: {
                type: String,
                url: 'https://i.ibb.co/JRF9WsY/confused.png',
                users: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                }],
                count: {
                    type: Number,
                    default: 0
                },
            }
        },
        replay: {
            text: {
                type: String,
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
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