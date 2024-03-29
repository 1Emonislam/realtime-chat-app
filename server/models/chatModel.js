const mongoose = require("mongoose");
const chatSchema = mongoose.Schema(
    {
        chatName: {
            type: String,
            required: [true, 'Please provide Group Name'],
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
            enum: ["private", "public"],
            required: [true, 'Select Group Type'],
        },
        description: {
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
        lastActive:{
            type:Date,
        },
        seen: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        action: {
            type: 'String',
            default: 'N/A'
        }
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;