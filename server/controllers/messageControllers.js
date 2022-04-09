const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
module.exports.sendMessage = async (req, res, next) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("invalid data passed into request");
        return res.status(400);
    }
    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }
    try {
        let message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name pic email'
        })
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        })
        return res.status(200).json({ data: message })
    } catch (error) {
        next(error)
    }
}
module.exports.allMessage = async (req, res, next) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "name pic email").populate("chat")
        return res.status(200).json(messages)
    } catch (error) {
        res.status(400)
        next(error);
    }
}