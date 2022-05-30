const Note = require("../models/noteModels");
module.exports.noteCreate = async (req, res, next) => {
    try {
        const issue = {}
        const { messageId, chatId, title, details, action = 'note', permission } = req.body;
        let { page = 1, limit = 10 } = req.query;
        if (!req?.user?._id) {
            return res.status(400).json({ error: { token: 'User Credentials expired! Please login!' } })
        }
        if (!(messageId || permission)) {
            issue.message = 'error occurred message!'
        }
        if (!(chatId || permission)) {
            issue.chat = 'error occurred chat!'
        }
        if (Object?.keys(issue)?.length) {
            return res.status(400).json({ error: issue })
        }
        const note = await Note.create({
            message: messageId, chat: chatId, title, details, author: req?.user?._id
        })
        const keyword = req.query.search ? {
            author: req?.user?._id,
            action: action,
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
                { message: messageId },
                { chat: chatId }
            ],
        } : { author: req?.user?._id, action: action };
        const data = await Note.find(keyword).sort("-createdAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const count = await Note.find(keyword).count();
        if (!note) {
            return res.status(400).json({ error: { note: 'Note Creation failed!' } })
        }
        return res.status(200).json({ message: 'My Note Collection Added New Note', data: data, count })
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
        let { page = 1, limit = 10 } = req.query;
        const { title, details, message, messageId = '', chatId = '', action = 'note' } = req.body;
        const keyword = req.query.search ? {
            author: req?.user?._id,
            action: action,
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
                { message: messageId },
                { chat: chatId }
            ],
        } : { author: req?.user?._id, action: action };
        const updateNote = await Note.findOneAndUpdate({ _id: req.params.id }, {
            title, details,
            action
        }, { new: true });
        if (!updateNote) {
            return res.status(400).json({ error: { note: "Action Failed to try again. Make Sure to Provide the Right Credentials!" } })
        }
        const data = await Note.find(keyword).sort("-createdAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const count = await Note.find(keyword).count();
        return res.status(200).json({ message: `Note ${message}`, data: data, count })
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
        const { messageId = '', chatId = '', action = 'note' } = req.body;
        const keyword = req.query.search ? {
            author: req?.user?._id,
            action: action,
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
                { message: messageId },
                { chat: chatId }
            ],
        } : { author: req?.user?._id, action: action };
        const data = await Note.find(keyword).sort("-createdAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const count = await Note.find(keyword).count();
        return res.status(200).json({ data: data, count })
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
        let { page = 1, limit = 10 } = req.query;
        const { messageId = '', chatId = '', action = 'note' } = req.body;
        const keyword = req.query.search ? {
            author: req?.user?._id,
            action: action,
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
                { message: messageId },
                { chat: chatId }
            ],
        } : { author: req?.user?._id, action: action };
        await Note.deleteOne({ _id: req?.params?.id?.trim() }, async function (err) {
            if (err) {
                return res.status(400).json({ error: { email: "Note Remove failed!" } })
            }
            if (!err) {
                const data = await Note.find(keyword).sort("-createdAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
                const count = await Note.find(keyword).count();
                return res.status(200).json({ message: 'Note Removed!', data: data, count })
            }
            // deleted at most one tank document
        });
    }
    catch (error) {
        next(error)
    }
}