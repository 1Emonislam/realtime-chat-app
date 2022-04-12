const mongoose = require("mongoose");
const chatSchema = mongoose.Schema(
    {
        chatName: {
            type: String,
            required: [true,'Please provide Group Name'],
        },
        img: {
            type: String,
            default: 'https://i.ibb.co/dKKKKH4/groupicon2.png'
        },
        isGroupChat: {
            type: Boolean,
            required: true,
            default: false,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        topic: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
        },
        Description: {
            type: String,
            trim: true,
        },
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        groupAdmin: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;