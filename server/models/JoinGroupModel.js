const { mongoose, Schema } = require('mongoose');
const joinGroupSchema = mongoose.Schema({
    joinChatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    userJoin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
})
const JoinGroup = mongoose.model("JoinGroup", joinGroupSchema);
module.exports = JoinGroup;