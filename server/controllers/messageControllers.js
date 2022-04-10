const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
module.exports.sendMessage = async (req, res, next) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("invalid data passed into request");
        return res.status(400);
    }
    const text = req.body?.content?.text;
    const audio = req.body?.content?.audio;
    const video = req.body?.content?.video;
    const others = req.body?.content?.others;
    let newMessage = {
        sender: req.user._id,
        content: {
            text,
            audio,
            video,
            others
        },
        chat: chatId,

    }
    try {
        let message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: 'chat.members',
            select: 'name pic email'
        })
        message = await User.populate(message, {
            path: 'chat.groupAdmin',
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
        await Message.updateMany({ chat: req.params.chatId }, {
            seen: {
                lastSeen: new Date(),
                user: req.user?._id
            }
        }, { new: true })
        let messages = await Message.find({ chat: req.params.chatId }).populate("sender", "name pic email").populate("chat").populate({
            path: "seen.user",
            select: "_id pic name email"
        })
        messages = await User.populate(messages, {
            path: 'chat.groupAdmin',
            select: 'name pic email'
        })
        return res.status(200).json(messages)
    } catch (error) {
        res.status(400)
        next(error);
    }
}