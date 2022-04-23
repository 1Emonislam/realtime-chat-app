const { mongoose, Schema } = require('mongoose');
const noteSchema = mongoose.Schema({
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
    }
}, {
    timestamps: true,
});
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;