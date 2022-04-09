const { mongoose, Schema } = require("mongoose");
const friendsSchema = new Schema({
    me: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    friend: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: [
            'addfriend',
            'requested',
            'pending',
            'friend'
        ],
        default: 'requested'
    },
    action: {
        type: String,
        enum: ['block','spam','igonre','accept'],
        default: 'accept'
    },
}, { timestamps: true })
const Friend = mongoose.model('Friends', friendsSchema);
module.exports = Friend;