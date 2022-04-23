const Note = require("../models/noteModels");
module.exports.noteCreate = async (req, res, next) => {
    try {
        const issue = {}
        const { messageId, chatId } = req.body;
        if (!req?.user?._id) {
            return res.status(400).json({ error: { token: 'User Credentials expired! Please login!' } })
        }
        if (!messageId) {
            issue.message = 'error occurred message!'
        }
        if (!chatId) {
            issue.chat = 'error occurred chat!'
        }
        if (Object?.keys(issue)?.length) {
            return res.status(400).json({ error: issue })
        }
        const data = await Note.create({
            message: messageId, chat: chatId, author: req?.user?._id
        })
        return res.status(200).json({ message: 'My Note Collection Added New Note', data: data })
    }
    catch (error) {
        next(error)
    }
}

module.exports.getNote = async (req, res, next) => {
    try {
        if (!req?.user?._id) {
            return res.status(400).json({ error: { token: 'User Credentials expired! Please login!' } })
        }
        const data = await Note.find({ author: req?.user?._id }).populate("message").populate("chat");
        return res.status(200).json({ data: data })
    }
    catch (error) {
        next(error)
    }
}

module.exports.removeNote = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { email: 'user permission denied! Please provide valid user credentials!' } })
    }
    try {
        await Note.deleteOne({ _id: req?.params?.id?.trim() }, function (err) {
            if (err) {
                return res.status(400).json({ error: { email: "Note Remove failed!" } })
            }
            if (!err) {
                return res.status(200).json({ message: 'Note Removed!' })
            }
            // deleted at most one tank document
        });
    }
    catch (error) {
        next(error)
    }
}