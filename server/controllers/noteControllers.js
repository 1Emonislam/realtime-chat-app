const Note = require("../models/noteModels");
module.exports.noteCreate = async (req, res, next) => {
    try {
        const issue = {}
        const { messageId, chatId, title, details,permission } = req.body;
        if (!req?.user?._id) {
            return res.status(400).json({ error: { token: 'User Credentials expired! Please login!' } })
        }
        if (!(messageId || permission)) {
            issue.message = 'error occurred message!'
        }
        if (!(chatId ||permission)) {
            issue.chat = 'error occurred chat!'
        }
        if (Object?.keys(issue)?.length) {
            return res.status(400).json({ error: issue })
        }
        const data = await Note.create({
            message: messageId, chat: chatId, title, details, author: req?.user?._id
        })
        if (!data) {
            return res.status(400).json({ error: { note: 'Note Creation failed!' } })
        }
        return res.status(200).json({ message: 'My Note Collection Added New Note', data: data })
    }
    catch (error) {
        next(error)
    }
}

module.exports.updateNote = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { token: 'User Credentials expired! Please login!' } })
    }
    try {
        const { title, details } = req.body;
        const updateNote = await Note.findOneAndUpdate({ _id: req.params.id }, {
            title, details
        }, { new: true });
        return res.status(200).json({ data: updateNote })
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
        let { page = 1, limit = 10 } = req.query;
        const keyword = req.query.search ? {
            author: req?.user?._id,
            $or: [
                { "content.text": { $regex: req.query.search, $options: "i" } },
            ],
        } : { author: req?.user?._id };
        const data = await Note.find(keyword).limit(limit * 1).skip((page - 1) * limit).populate("message").populate("chat");
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