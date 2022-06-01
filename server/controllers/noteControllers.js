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
                
               
            ],
        } : { author: req?.user?._id, action: action };
        const data = await Note.find(keyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const count = await Note.find(keyword).count();
        if (!note) {
            return res.status(400).json({ error: { note: 'Note Creation failed!' } })
        }
        return res.status(200).json({ message: 'My Note Collection Added New Note', data: { note: data, noteCount: count }, count })
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
        const { title, details,message, status = 'note',action = 'note' } = req.body;
        const updateNote = await Note.findOneAndUpdate({ _id: req.params.id, author: req?.user?._id }, {
            title, details,
            action
        }, { new: true });
        if (!updateNote) {
            return res.status(400).json({ error: { note: "Action Failed to try again. Make Sure to Provide the Right Credentials!" } })
        }
        const noteKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'note',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
            ],
        } : { author: req?.user?._id, action: 'note' };
        const note = await Note.find(noteKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const noteCount = await Note.find(noteKeyword).count();
        //2 trash
        const trashKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'trash',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
                
               
            ],
        } : { author: req?.user?._id, action: 'trash' };
        const trash = await Note.find(trashKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const trashCount = await Note.find(trashKeyword).count();
        //3 archive
        const archiveKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'archive',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
                
               
            ],
        } : { author: req?.user?._id, action: 'archive' };
        const archive = await Note.find(archiveKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const archiveCount = await Note.find(archiveKeyword).count();
        const pinKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'pin',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
                
               
            ],
        } : { author: req?.user?._id, action: 'pin' };
        const pin = await Note.find(pinKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const pinCount = await Note.find(pinKeyword).count();
        return res.status(200).json({
            message: `Note ${message}`,
            data: {
                note,
                noteCount,
                trash,
                trashCount,
                archive,
                archiveCount,
                pin,
                pinCount
            },
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports.deleteSingleNote = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { token: 'User Credentials expired! Please login!' } })
    }
    try {
        let { page = 1, limit = 10 } = req.query;
        const deletedFile = await Note.deleteOne({ _id: req.params.id, author: req.user?._id, action: 'trash' });
        let deletedPermission;
        if (deletedFile.deletedCount === 1) {
            deletedPermission = true;
        } else if (deletedFile.deletedCount !== 1) {
            const keyword = req.query.search ? {
                author: req?.user?._id,
                action: 'trash',
                $or: [
                    { "title": { $regex: req.query.search, $options: "i" } },
                    { "details": { $regex: req.query.search, $options: "i" } },
                ],
            } : { author: req?.user?._id, action: 'trash' };
            const trash = await Note.find(keyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
            const trashCount = await Note.find(keyword).sort("-updatedAt").count()
            return res.status(400).json({ error: { note: 'Trash Remove Failed!' }, data: { trash: trash, trashCount: trashCount } })
        }
        const noteKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'note',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
            ],
        } : { author: req?.user?._id, action: 'note' };
        const note = await Note.find(noteKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const noteCount = await Note.find(noteKeyword).count();
        //2 trash
        const trashKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'trash',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },  
            ],
        } : { author: req?.user?._id, action: 'trash' };
        const trash = await Note.find(trashKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const trashCount = await Note.find(trashKeyword).count();
        //3 archive
        const archiveKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'archive',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
            ],
        } : { author: req?.user?._id, action: 'archive' };
        const archive = await Note.find(archiveKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const archiveCount = await Note.find(archiveKeyword).count();
        const pinKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'pin',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },  
            ],
        } : { author: req?.user?._id, action: 'pin' };
        const pin = await Note.find(pinKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const pinCount = await Note.find(pinKeyword).count();
        return res.status(200).json({
            message: `Note Trash Removed Successfully!`,
            data: {
                note,
                noteCount,
                trash,
                trashCount,
                archive,
                archiveCount,
                pin,
                pinCount
            },
        })
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
        const noteKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'note',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
            ],
        } : { author: req?.user?._id, action: 'note' };
        const note = await Note.find(noteKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const noteCount = await Note.find(noteKeyword).count();
        //2 trash
        const trashKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'trash',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } }        
            ],
        } : { author: req?.user?._id, action: 'trash' };
        const trash = await Note.find(trashKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const trashCount = await Note.find(trashKeyword).count();
        //3 archive
        const archiveKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'archive',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },

            ],
        } : { author: req?.user?._id, action: 'archive' };
        const archive = await Note.find(archiveKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const archiveCount = await Note.find(archiveKeyword).count();
        const pinKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'pin',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },

            ],
        } : { author: req?.user?._id, action: 'pin' };
        const pin = await Note.find(pinKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const pinCount = await Note.find(pinKeyword).count();
        return res.status(200).json({
            message: '',
            data: {
                note,
                noteCount,
                trash,
                trashCount,
                archive,
                archiveCount,
                pin,
                pinCount
            },
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports.allRemoveNote = async (req, res, next) => {
    if (!req?.user?._id) {
        return res.status(400).json({ error: { token: 'User Credentials expired! Please login!' } })
    }
    try {
        let { page = 1, limit = 10 } = req.query;
        const keyword = req.query.search ? {
            author: req?.user?._id,
            action: 'note',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
            ],
        } : { author: req?.user?._id, action: 'note' };
        const deletedFile = await Note.deleteMany({ author: req.user?._id, action: 'trash' });
        let deletedPermission;
        if (deletedFile.deletedCount === 1) {
            deletedPermission = true
        } else if (deletedFile.deletedCount !== 1) {
            const trash = await Note.find(keyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
            const trashCount = await Note.find(keyword).sort("-updatedAt").count()
            return res.status(400).json({ error: { trash: 'All Trash Remove Failed!' }, data: { trash: trash, trashCount: trashCount } })
        }
        const noteKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'note',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
            ],
        } : { author: req?.user?._id, action: 'note' };
        const note = await Note.find(noteKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const noteCount = await Note.find(noteKeyword).count();
        //2 trash
        const trashKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'trash',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } },
            ],
        } : { author: req?.user?._id, action: 'trash' };
        const trash = await Note.find(trashKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const trashCount = await Note.find(trashKeyword).count();
        //3 archive
        const archiveKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'archive',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } }, 
            ],
        } : { author: req?.user?._id, action: 'archive' };
        const archive = await Note.find(archiveKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const archiveCount = await Note.find(archiveKeyword).count();
        const pinKeyword = req.query.search ? {
            author: req?.user?._id,
            action: 'pin',
            $or: [
                { "title": { $regex: req.query.search, $options: "i" } },
                { "details": { $regex: req.query.search, $options: "i" } }, 
            ],
        } : { author: req?.user?._id, action: 'pin' };
        const pin = await Note.find(pinKeyword).sort("-updatedAt").limit(limit * 1).skip((page - 1) * limit).populate("message", "content").populate("chat", "chatName img _id");
        const pinCount = await Note.find(pinKeyword).count();
        return res.status(200).json({
            message: `Note All Trash Removed Successfully!`,
            data: {
                note,
                noteCount,
                trash,
                trashCount,
                archive,
                archiveCount,
                pin,
                pinCount
            },
        })
    }
    catch (error) {
        next(error)
    }
}