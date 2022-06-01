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
    },
    pin: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
    },
    action: {
        type: String,
        default: 'note'
    },
    details: {
        type: String,
    }
}, {
    timestamps: true,
});
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;