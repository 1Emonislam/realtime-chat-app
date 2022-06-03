const { mongoose, Schema } = require('mongoose');
const reactionSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    icon: {
        type: String,
    },
    count: {
        type: Number
    }
}, {
    timestamps: true,
});
const Reaction = mongoose.model("Reaction", reactionSchema);
module.exports = Reaction;