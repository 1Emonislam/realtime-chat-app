const User = require("../models/userModel");

module.exports.searchUsers = async (req, res, next) => {
    try {
        if (req?.user?.role !== 'admin') {
            return res.status(400).json({ error: { admin: 'You can perform only Administrator' } })
        }
        let { page = 1, limit = 10 } = req.query;
        limit = parseInt(limit)
        const keyword = req.query.search ? {
            $or: [
                { firstName: { $regex: req.query.search, $options: "i" } },
                { lastName: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
                { username: { $regex: req.query.search, $options: "i" } },
                { status: 'active' },
            ],
        } : { status: 'active' };
        const doc = await User.find(keyword).select("-password").sort("-createdAt").limit(limit * 1)
            .skip((page - 1) * limit)
        const count = await User.find(keyword).sort("-createdAt").count()
        return res.status(200).json({ data: doc, count })
    }
    catch (error) {
        next(error)
    }
}


module.exports.blockUsers = async (req, res, next) => {
    try {
        if (req?.user?.role !== 'admin') {
            return res.status(400).json({ error: { admin: 'You can perform only Administrator' } })
        }
        let { page = 1, limit = 10 } = req.query;
        limit = parseInt(limit)
        const keyword = req.query.search ? {

            $or: [
                { firstName: { $regex: req.query.search, $options: "i" } },
                { lastName: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
                { username: { $regex: req.query.search, $options: "i" } },
                { status: 'block' },
            ],
        } : { status: 'block' };
        const doc = await User.find(keyword).select("-password").sort("-createdAt").limit(limit * 1)
            .skip((page - 1) * limit)
        const count = await User.find(keyword).sort("-createdAt").count()
        return res.status(200).json({ data: doc, count })
    }
    catch (error) {
        next(error)
    }
}

module.exports.reportUsers = async (req, res, next) => {
    try {
        if (req?.user?.role !== 'admin') {
            return res.status(400).json({ error: { admin: 'You can perform only Admin' } })
        }
        let { page = 1, limit = 10 } = req.query;
        limit = parseInt(limit)
        const keyword = req.query.search ? {
            $or: [
                { firstName: { $regex: req.query.search, $options: "i" } },
                { lastName: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
                { username: { $regex: req.query.search, $options: "i" } }
            ],
        } : {};
        const doc = await User.find(keyword).select("-password").sort("-createdAt").limit(limit * 1)
            .skip((page - 1) * limit)
        const count = await User.find(keyword).sort("-createdAt").count()
        return res.status(200).json({ data: doc, count })
    }
    catch (error) {
        next(error)
    }
}
module.exports.actionUsers = async (req, res, next) => {
    try {
        if (req?.user?.role !== 'admin') {
            return res.status(400).json({ error: { admin: 'You can perform only Admin' } })
        }
        let { page = 1, limit = 10, } = req.query;
        const { userId, status } = req.body;
        limit = parseInt(limit)
        let con = status?.trim() === 'block' ? 'active' : 'block'
        const keyword = req.query.search ? {
            $or: [
                { firstName: { $regex: req.query.search, $options: "i" } },
                { lastName: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
                { username: { $regex: req.query.search, $options: "i" } },
                { status: con },
            ],
        } : { status: con };
        if (status) {
            const updatedUser = await User.findOneAndUpdate({ _id: userId }, {
                status: status
            }, { new: true }).select("-password")

            const doc = await User.find(keyword).sort("-createdAt").select("-password").limit(limit * 1)
                .skip((page - 1) * limit)
            const count = await User.find(keyword).sort("-createdAt").count()
            return res.status(200).json({ message: `User Successfully ${status || ''}`, data: doc, count, updatedUser: updatedUser })
        } else {
            return res.status(400).json({ error: { admin: 'Action is Requered!' } })
        }
    }
    catch (error) {
        next(error)
    }
}

module.exports.makeAdmin = async (req, res, next) => {
    try {
        if (req?.user?.role !== 'admin') {
            return res.status(400).json({ error: { admin: 'You can perform only Administrator' } })
        }
        const { userId, sort, role } = req.body;
        let { page = 1, limit = 10 } = req.query;
        limit = parseInt(limit)
        const keyword = req.query.search ? {
            status: sort || '',
            $or: [
                { firstName: { $regex: req.query.search, $options: "i" } },
                { lastName: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
                { username: { $regex: req.query.search, $options: "i" } },
                { status: sort || '' },
            ],
        } : { status: sort || '' };
        const user = await User.findOne({ _id: userId });
        if (user) {
            user.role = role;
            await user.save()
            const doc = await User.find(keyword).sort("-createdAt").select("-password").limit(limit * 1)
                .skip((page - 1) * limit)
            const updatedUser = await User.findOne({ _id: userId }).select("-password")
            const count = await User.find(keyword).sort("-createdAt").count()
            return res.status(200).json({ message: 'Administrator added Successfully!', data: doc, count, updatedUser: updatedUser })
        } else {
            return res.status(400).json({ error: { admin: `User doesn't exists!` } })
        }
    }
    catch (error) {
        next(error)
    }
}