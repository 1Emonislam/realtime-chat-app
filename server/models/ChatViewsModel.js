const { mongoose, Schema } = require('mongoose');
const viewsChatSchema = mongoose.Schema({
    viewsChatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
})
const ViewsChat = mongoose.model("ViewsChat", viewsChatSchema);
module.exports = ViewsChat;