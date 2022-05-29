const Chat = require("../models/chatModel");
const GroupNotification = require("../models/groupNotificationModel");
const Message = require("../models/messageModel");
const UploadFiles = require("../models/uploadFilesModel");
const User = require("../models/userModel");
const { upload, fileUpload } = require("../utils/file");

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
    let newMessage = {
        sender: req.user._id,
        content: {
            text,
        },
        chat: chatId,
    }
    try {
        let message = await Message.create(newMessage);
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message?._id,
            seen: [req.user?._id],
            isGroupChat: true
        }).populate({
            path: 'groupAdmin',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.audio',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.video',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.others',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.images',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await User.populate(message, {
            path: 'sender',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await User.populate(message, {
            path: 'chat.members',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await Chat.populate(message, {
            path: 'chat',
            select: '_id  chatName img seen groupAdmin members',
        })
        message = await Chat.populate(message, {
            path: 'chat.members',
            select: '_id pic firstName lastName email online lastOnline',
        })
        message = await User.populate(message, {
            path: 'chat.groupAdmin',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await Chat.populate(message, {
            path: 'chat.seen',
            select: '_id pic firstName lastName email online lastOnline',
        })
        if (message) {
            const sendUser = await message?.chat?.members?.filter(member => {
                return (member?._id?.toString() !== req?.user?._id?.toString());
            });
            // console.log(message.chat)
            if (sendUser?.length) {
                for (const member of sendUser) {
                    await GroupNotification.create({
                        receiver: member?._id,
                        type: 'groupchat',
                        seen: false,
                        subject: `New Message from ${message?.sender?.firstName + ' ' + message?.sender?.lastName}`,
                        sender: message?.sender?._id,
                        message: message?._id,
                        chat: message?.chat?._id,
                    })
                }
            }
        }
        return res.status(200).json({ data: message })
    } catch (error) {
        next(error)
    }
}
module.exports.sendFilesUploadMessage = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    if (!req.params?.id) {
        console.log("invalid data passed into request");
        return res.status(400);
    }

    let { secure_url, write, bytes, original_filename, format, duration, resource_type, audioFile,voiceFile, videoFile, othersFile, imagesFile } = req.body;
    try {
        const uploadFile = await UploadFiles.create({
            author: req.user?._id,
            chat: req.params?.id,
            filename: original_filename,
            sizeOfBytes: bytes,
            format,
            type: audioFile || videoFile || othersFile || voiceFile || imagesFile,
            duration: duration || '',
            url: secure_url,
        })
        // console.log(uploadFile)
        if (audioFile) {
            audioFile = uploadFile?._id
        }
        if (videoFile) {
            videoFile = uploadFile?._id
        }
        if (othersFile) {
            othersFile = uploadFile?._id
        }
        if (imagesFile) {
            imagesFile = uploadFile?._id
        }
        let newMessage = {
            sender: req.user?._id,
            content: {
                text: write || '',
                audio: audioFile,
                video: videoFile,
                images: imagesFile,
                others: othersFile,
            },
            chat: req.params?.id,
        }
        let message = await Message.create(newMessage);
        // console.log(message)
        await Chat.findByIdAndUpdate(req.params?.id, {
            latestMessage: message?._id,
            seen: [req.user?._id],
            isGroupChat: true
        }).populate({
            path: 'groupAdmin',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.audio',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.video',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.others',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.images',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await User.populate(message, {
            path: 'sender',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await User.populate(message, {
            path: 'chat.members',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await Chat.populate(message, {
            path: 'chat',
            select: '_id  chatName img seen groupAdmin members',
        })
        message = await Chat.populate(message, {
            path: 'chat.members',
            select: '_id pic firstName lastName email online lastOnline',
        })
        message = await User.populate(message, {
            path: 'chat.groupAdmin',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await Chat.populate(message, {
            path: 'chat.seen',
            select: '_id pic firstName lastName email online lastOnline',
        })
        // console.log(message)
        if (message) {
            const sendUser = await message?.chat?.members?.filter(member => {
                return (member?._id?.toString() !== req?.user?._id?.toString());
            });
            // console.log(message.chat)
            if (sendUser?.length) {
                for (const member of sendUser) {
                    await GroupNotification.create({
                        receiver: member?._id,
                        type: 'groupchat',
                        seen: false,
                        subject: `New Message from ${message?.sender?.firstName + ' ' + message?.sender?.lastName}`,
                        sender: message?.sender?._id,
                        message: message?._id,
                        chat: message?.chat?._id,
                    })
                }
            }
        }
        return res.status(200).json({ data: message })
    } catch (error) {
        next(error)
    }
}
module.exports.allMessage = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    try {
        let { page = 1, limit = 1 } = req.query;
        limit = parseInt(limit);
        const skip = parseInt(page - 1);
        const size = limit;
        const numPage = skip * size;
        const keyword = req.query.search ? {
            chat: req.params.chatId,
            $or: [
                { "content.text": { $regex: req.query.search, $options: "i" } },
            ],
        } : { chat: req.params.chatId };

        let message;
        if (req.query?.search) {
            message = await Message.find(keyword, { members: { $slice: [numPage, size] } }, { groupAdmin: { $slice: [numPage, size] } }).sort('-createdAt').limit(100)
        } else {
            message = await Message.find({ chat: req.params.chatId }).limit(100)
        }
        message = await UploadFiles.populate(message, {
            path: 'content.audio',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.video',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.others',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.images',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await User.populate(message, {
            path: 'sender',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await User.populate(message, {
            path: 'chat.members',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await Chat.populate(message, {
            path: 'chat',
            select: '_id seen groupAdmin members img chatName',
        })
        message = await User.populate(message, {
            path: 'chat.groupAdmin',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await Chat.populate(message, {
            path: 'chat.seen',
            select: '_id pic firstName lastName email online lastOnline',
        })
        await GroupNotification.updateMany({ chat: req.params?.chatId, receiver: req.user?._id }, {
            seen: true,
            lastSeen: new Date(),
        }, { new: true })
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
            me: message?.length > 0 ? me : {},
            data: message
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
        let message = await Message.find({ chat: chatId }).limit(100)
        message = await UploadFiles.populate(message, {
            path: 'content.audio',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.video',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.others',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.images',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await User.populate(message, {
            path: 'sender',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await User.populate(message, {
            path: 'chat.members',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await Chat.populate(message, {
            path: 'chat',
            select: '_id seen groupAdmin',
        })
        message = await User.populate(message, {
            path: 'chat.groupAdmin',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await Chat.populate(message, {
            path: 'chat.seen',
            select: '_id pic firstName lastName email online lastOnline',
        })
        await GroupNotification.updateMany({ chat: chatId, receiver: req.user?._id }, {
            seen: true,
            lastSeen: new Date(),
        }, { new: true })
        const me = {
            msgLastSeen: new Date(),
            info: {
                firstName: req?.user?.firstName,
                lastName: req?.user?.lastName,
                pic: req?.user?.pic,
                email: req?.user?.email
            }
        }
        if (delete1?.deletedCount > 0 || delete2?.deletedCount > 0) {
            await GroupNotification.deleteMany({ message: messageId, chat: chatId });
            return res.status(200).json({
                message: "Message Removed Successfully",
                me: message?.length > 0 ? me : {},
                data: message
            });
        } else {
            return res.status(400).json({
                error: { action: "Message Removed Failed!" }, me: message?.length > 0 ? me : {},
                data: message
            })
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
    if (!chatId || !messageId) {
        return res.status(400).json({ error: { token: "please provide valid credentials!" } })
    }
    try {
        let message = await Message.findOneAndUpdate({ _id: messageId, chat: chatId, sender: req.user?._id }, {
            content: {
                text,
            },
        }, { new: true }) || await Message.findOneAndUpdate({ _id: messageId, chat: chatId, groupAdmin: req.user?._id }, {
            content: {
                text,
            },
        }, { new: true });
        await Chat.findOneAndUpdate({ _id: req.body.chatId }, {
            latestMessage: message?._id,
            $addToSet: { seen: req.user?._id }
        }, { new: true }).populate({
            path: 'groupAdmin',
            select: '_id pic firstName lastName email online lastOnline'
        })
        // console.log(message)
        if (!message) {
            return res.status(400).json({ error: { action: "Message Update Failed!" }, data: [] })
        }
        // console.log(message)
        if (message) {
            message = await Message.find({ chat: chatId }).limit(100)
            message = await UploadFiles.populate(message, {
                path: 'content.files',
                select: '_id duration author filename sizeOfBytes type format duration url createdAt'
            })
            message = await User.populate(message, {
                path: 'sender',
                select: '_id pic firstName lastName email online lastOnline'
            })
            message = await Chat.populate(message, {
                path: 'chat',
                select: '_id  chatName img seen groupAdmin members',
            })
            message = await User.populate(message, {
                path: 'chat.members',
                select: '_id pic firstName lastName email online lastOnline'
            })
            message = await User.populate(message, {
                path: 'chat.groupAdmin',
                select: '_id pic firstName lastName email online lastOnline'
            })
            message = await Chat.populate(message, {
                path: 'chat.seen',
                select: '_id pic firstName lastName email online lastOnline',
            })
            await GroupNotification.updateMany({ chat: chatId, receiver: req.user?._id }, {
                seen: true,
                lastSeen: new Date(),
            }, { new: true })
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
                message: "Message Successfully Updated",
                me: message?.length > 0 ? me : {},
                data: message
            });
        }
    }
    catch (error) {
        next(error)
    }
}
module.exports.allMessageRemove = async (req, res, next) => {
    try {
        if (!req?.user?._id) {
            return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
        }
        const permission = await Chat.findOne({ _id: req.params.chatId, groupAdmin: req?.user?._id });
        if (!permission) {
            return res.status(400).json({
                error: { email: 'Permission denied You can perform only Group Admin' }
            })
        }
        const deleted = await Message.deleteMany({ chat: req.params?.chatId });
        let message = await Message.find({ chat: req.params?.chatId }).limit(100)
        message = await UploadFiles.populate(message, {
            path: 'content.audio',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.video',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.others',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await UploadFiles.populate(message, {
            path: 'content.images',
            select: '_id duration author filename sizeOfBytes type format duration url createdAt'
        })
        message = await User.populate(message, {
            path: 'sender',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await User.populate(message, {
            path: 'chat.members',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await Chat.populate(message, {
            path: 'chat',
            select: '_id seen groupAdmin',
        })
        message = await User.populate(message, {
            path: 'chat.groupAdmin',
            select: '_id pic firstName lastName email online lastOnline'
        })
        message = await Chat.populate(message, {
            path: 'chat.seen',
            select: '_id pic firstName lastName email online lastOnline',
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
        if (deleted?.deletedCount > 0) {
            await GroupNotification.deleteMany({ chat: req.params?.chatId });
            return res.status(200).json({
                message: 'Deleted all Conversation!',
                me: message?.length > 0 ? me : {},
                data: message
            })
        } else {
            return res.status(400).json({
                error: {
                    chatId: 'Error occurred Please try again!'
                },
                me: message?.length > 0 ? me : {},
                data: message
            })
        }
    }
    catch (error) {
        next(error)
    }
}