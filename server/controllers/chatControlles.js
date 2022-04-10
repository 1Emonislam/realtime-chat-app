const Chat = require("../models/chatModel");
const User = require("../models/userModel");

module.exports.acessChat = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    {
        const { userId } = req.body;
        try {
            if (!userId) {
                console.log("user Id sent with requset");
                return res.status(400);
            }
            let isChat = await Chat.find({
                isGroupChat: false,
                $and: [
                    { members: { $elemMatch: { $eq: req.user._id } } },
                    { members: { $elemMatch: { $eq: userId } } },
                ],
            })
                .populate("members", "-password")
                .populate("latestMessage");
            isChat = await User.populate(isChat, {
                path: "latesetMessage.sender",
                select: "name pic email",
            });
            if (isChat?.length > 0) {
                return res.json(isChat[0]);
            } else {
                let chatData = {
                    chatName: "sender",
                    isGroupChat: false,
                    members: [req.user._id, userId],
                };
                try {
                    const createdChat = await Chat.create(chatData);
                    const fullChat = await Chat.findOne({
                        _id: createdChat._id,
                    }).populate("members", "-password");
                    return res.status(200).json({ data: fullChat });
                } catch (error) {
                    next(error);
                }
            }
        } catch (error) {
            next(error);
        }
    }
};
module.exports.getChat = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    try {
        await Chat.find({ members: { $elemMatch: { $eq: req.user._id } } }).populate("members", "-password").populate("latestMessage").populate("groupAdmin", "-password").sort({ updatedAt: -1 }).then(async (results) => {
            // console.log(results)
            results = await User.populate(results, {
                path: "latestMessage.sender",
                select: "name pic email"
            })
            return res.status(200).json({ data: results })
        })
    } catch (error) {
        next(error)
    }
};

module.exports.groupCreate = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    // console.log(req.body.members)
    if (!req.body.members || !req.body.chatName) {
        return res.status(400).json({ error: "Please Fill all the feilds! Members and ChatName" })
    }
    try {
        const groupChat = await Chat.create({
            chatName: req.body.chatName,
            isGroupChat: true,
            members: [req?.user?._id, ...req?.body?.members],
            groupAdmin: req?.user?._id,
        });
        const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate("members", "-password").populate("groupAdmin", "-password");
        return res.status(200).json({ data: fullGroupChat })
    } catch (error) {
        error.status = 400;
        next(error);
    }
};
module.exports.groupRename = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    const { chatId, chatName } = req.body;
    try {
        const updatedChat = await Chat.findOneAndUpdate({ _id: chatId, groupAdmin: req?.user?._id }, {
            chatName
        }, { new: true }).populate("members", "-password").populate("groupAdmin", "-password");
        if (!updatedChat) {
            return res.status(400).json({ error: "you can perform only Admin Group Rename!" });
        } if (updatedChat) {
            return res.status(200).json({ message: "chat successfully updated!", data: updatedChat })
        }
    } catch (error) {
        next(error);
    }
};
module.exports.groupAddTo = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    const { chatId, userId } = req.body;
    try {
        const exist = await Chat.findOne({ _id: chatId, members: userId });
        if (exist) {
            return res.status(400).json({ error: "Already Members This Group" })
        }
        const added = await Chat.findByIdAndUpdate(chatId, {
            $addToSet: { members: userId },
        }, { new: true }).populate("members", "-password").populate("groupAdmin", "-password");
        // console.log(added)
        if (!added) {
            return res.status(404).json({ error: "chat not founds!", data: [] });
        }
        if (added) return res.status(200).json({ message: "Member added successfully!", data: added })
    }
    catch (error) {
        next(error)
    }
}
module.exports.groupRemoveTo = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    const { chatId, userId } = req.body;
    try {
        const remove = await Chat.findByIdAndUpdate(chatId, {
            $pull: { members: userId },
        }, { new: true }).populate("members", "-password").populate("groupAdmin", "-password");
        if (!remove) {
            return res.status(404).json({ error: "member not founds!" });
        }
        if (remove) return res.status(200).json({ message: "removed successfully!", data: remove })
    }
    catch (error) {
        next(error)
    }
}

