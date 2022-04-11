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
            select: '_id pic name email'
        })
        message = await User.populate(message, {
            path: 'chat.groupAdmin',
            select: '_id pic name email'
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
        let messages = await Message.find({ chat: req.params.chatId }).populate("sender", "_id pic name email").populate("chat").populate({
            path: "seen.user",
            select: "_id pic name email"
        })
        messages = await User.populate(messages, {
            path: 'chat.groupAdmin',
            select: '_id pic name email'
        })
        messages = messages?.reduce((acc, curr) => {
            const messages = curr._doc;
            // console.log(messages)
            acc.push({
                ...messages,
            });
            return acc;
        }, []);
        return res.status(200).json({
            message: "messagess fetched successfully",
            data: messages,
        });
    } catch (error) {
        res.status(400)
        next(error);
    }
}
module.exports.messageRemove = async (req, res, next) => {
    const { chatId, messageId } = req.body;
    if (!chatId || !messageId) {
        return res.status(400).json({ error: "please provide valid credentials!" })
    }
    try {
        const delete1 = await Message.deleteOne({ _id: messageId, chat: chatId, groupAdmin: req.user?._id })
        const delete2 = await Message.deleteOne({ _id: messageId, chat: chatId, sender: req.user?._id })
        // console.log(delete1, delete2)
        if (delete1?.deletedCount > 0 || delete2?.deletedCount > 0) {
            res.status(200).json({ message: "message Removed successfully" })
        } else {
            return res.status(400).json({ error: "message Removed Failed!" })
        }
    }
    catch (error) {
        next(error)
    }

}
module.exports.messageEdit = async (req, res, next) => {
    const { chatId, messageId } = req.body;
    const text = req.body?.content?.text;
    const audio = req.body?.content?.audio;
    const video = req.body?.content?.video;
    const others = req.body?.content?.others;
    if (!chatId || !messageId) {
        return res.status(400).json({ error: "please provide valid credentials!" })
    }
    try {
        let message = await Message.findOneAndUpdate({ _id: messageId, chat: chatId, sender: req.user?._id }, {
            content: {
                text,
                audio,
                video,
                others
            },
        }, { new: true });
        // console.log(message)
        if (!message) {
            return res.status(400).json({ error: "Message Update Failed!", data: [] })
        }
        // console.log(message)
        if (message) {
            message = await Message.find({ chat: chatId }).populate("sender", "_id pic name email").populate("chat").populate({
                path: "seen.user",
                select: "_id pic name email"
            })
            message = await User.populate(message, {
                path: 'chat.groupAdmin',
                select: '_id pic name email'
            })
            return res.status(200).json({ message: "Message Successfully Updated!", data: message })
        }
    }
    catch (error) {
        next(error)
    }
}