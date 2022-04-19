const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
module.exports.sendMessage = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
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
        const permission = await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message?._id,
            seen: []
        }).populate("groupAdmin")
        message = await Message.find({ chat: chatId })
        message = await User.populate(message, {
            path: 'sender',
            select: '_id pic firstName lastName email'
        })
        message = await User.populate(message, {
            path: 'chat.members',
            select: '_id pic firstName lastName email'
        })
        message = await User.populate(message, {
            path: 'chat.groupAdmin',
            select: '_id pic firstName lastName email'
        })
        message = await Chat.populate(message, {
            path: 'chat',
            select: '_id seen',
        })
        message = await Chat.populate(message, {
            path: 'chat.seen',
            select: '_id pic firstName lastName email',
        })
        return res.status(200).json({ data: message})
    } catch (error) {
        next(error)
    }
}
module.exports.allMessage = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    try {
        let messages = await Message.find({ chat: req.params.chatId }).limit(200).populate("sender", "_id pic firstName lastName email")
        await Chat.findOneAndUpdate({ _id: req.params.chatId }, {
            lastActive: new Date(),
            $addToSet: { seen: req.user?._id }
        }, { new: true })
        messages = await Chat.populate(messages, {
            path: 'chat.members',
            select: '_id pic firstName lastName email',
        })
        messages = await Chat.populate(messages, {
            path: 'chat',
            select: '_id seen',
        })
        messages = await Chat.populate(messages, {
            path: 'chat.seen',
            select: '_id pic firstName lastName email',
        })
        messages = await User.populate(messages, {
            path: 'chat.groupAdmin',
            select: '_id pic firstName lastName email'
        })
        const me = {
            msgLastSeen: new Date(),
            info: {
                firstName: req?.user?.firstName,
                lastName: req?.user?.lastName,
                pic: req?.user?.pic,
                email: req?.user?.email
            }
        }
        return res.status(200).json({
            message: "messages fetched successfully",
            me: messages?.length > 0 ? me : {},
            data: messages
        });
    } catch (error) {
        res.status(400)
        next(error);
    }
}
module.exports.messageRemove = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    const { chatId, messageId } = req.body;
    if (!chatId || !messageId) {
        return res.status(400).json({ error: { token: "please provide valid credentials!" } })
    }
    try {
        const delete1 = await Message.deleteOne({ _id: messageId, chat: chatId, groupAdmin: req.user?._id })
        const delete2 = await Message.deleteOne({ _id: messageId, chat: chatId, sender: req.user?._id })
        // console.log(delete1, delete2)
        if (delete1?.deletedCount > 0 || delete2?.deletedCount > 0) {
            res.status(200).json({ message: "message Removed successfully" })
        } else {
            return res.status(400).json({ error: { action: "message Removed Failed!" } })
        }
    }
    catch (error) {
        next(error)
    }

}
module.exports.messageEdit = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    const { chatId, messageId } = req.body;
    const text = req.body?.content?.text;
    const audio = req.body?.content?.audio;
    const video = req.body?.content?.video;
    const others = req.body?.content?.others;
    if (!chatId || !messageId) {
        return res.status(400).json({ error: { token: "please provide valid credentials!" } })
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
            return res.status(400).json({ error: { action: "Message Update Failed!" }, data: [] })
        }
        // console.log(message)
        if (message) {
            message = await Message.find({ chat: chatId }).populate("sender", "_id pic firstName lastName email")
            message = await Chat.populate(message, {
                path: 'chat',
                select: '_id seen groupAdmin members',
            })
            message = await Chat.populate(message, {
                path: 'chat.seen',
                select: '_id pic firstName lastName email',
            })
            message = await User.populate(message, {
                path: 'chat.groupAdmin',
                select: '_id pic firstName lastName email'
            })
            return res.status(200).json({ message: "Message Successfully Updated!", data: message })
        }
    }
    catch (error) {
        next(error)
    }
}