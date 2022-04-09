const User = require('../models/userModel');
const Notificatin = require('../models/notificationModel');
const Friend = require('./FriendModel');
exports.getFriends = async (req, res, next) => {
    let { status, page = 1, limit = 10 } = req.query;
    limit = parseInt(limit);
    // console.log(status)
    if (status) {
        let keyword;
        keyword = req.query?.search ? {
            _id: req?.user?._id,
            $or: [
                { firstName: { $regex: req.query.search?.toLowerCase(), $options: "i" } },
                { lastName: { $regex: req.query.search?.toLowerCase(), $options: "i" } },
                { username: { $regex: req.query.search?.toLowerCase(), $options: "i" } },
                { email: { $regex: req.query.search?.toLowerCase(), $options: "i" } },
                { status: status },

            ],
        } : { status: status || '' };
    }

    if (!status) {
        keyword = req.query?.search ? {
            _id: req?.user?._id,
            $or: [
                { firstName: { $regex: req.query.search?.toLowerCase(), $options: "i" } },
                { lastName: { $regex: req.query.search?.toLowerCase(), $options: "i" } },
                { username: { $regex: req.query.search?.toLowerCase(), $options: "i" } },
                { email: { $regex: req.query.search?.toLowerCase(), $options: "i" } },
                { status: status },
            ],
        } : {};
    }
    try {
        let friend = await Friend.find(keyword).limit(limit * 1)
            .skip((page - 1) * limit);
        res.status(200).json({
            data: friend ? friend : []
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports.addFriend = async (req, res, next) => {
    const issue = {};
    const username = req.body?.username?.toLowerCase() || '';
    const email = req.body?.email?.toLowerCase() || '';
    const phone = req.body?.phone;
    if (!(username || email || phone)) {
        issue.username = 'Could not find user please provide email or username';
    }
    if (!(req?.user?._id)) {
        issue.email = 'User Credentials expired! Please login'
    }
    try {
        let friend = await User.findOne({ username: username }) ? await User.findOne({ username: username }) : await User.findOne({ email: email })
        if (friend === null) {
            friend = await User.findOne({ phone: phone })
        }
        if (!(friend)) {
            issue.username = 'Could not find user please provide email or username';
        }
        const friendExits = await Friend.findOne({ me: req?.user?._id, friend: friend?._id });
        if (friendExits) {
            issue.username = 'friend list already exists!'
        }
        if (Object.keys(issue)?.length) {
            return res.status(400).json({ error: issue })
        }
        if (!friendExits) {
            const payload = {
                me: req?.user?.id,
                friend: friend?._id
            }
            await Friend.create(payload);
            const notifyPayload = {
                receiver: friend?._id,
                type: 'contact',
                subject: `Aded New Contact from ${req?.user?.firstName}`,
                message: 'Messages and calls are end-to-end encrypted',
            }
            let myFriend = await User.findOneAndUpdate({ _id: req.user?._id }, {
                $addToSet: { friends: [friend?._id] },
            }, { new: true }).populate({
                path: 'friends',
                model: 'User',
                select: "-password"
            })
            await Notificatin.create(notifyPayload);
            if (myFriend) {
                return res.status(200).json({ message: 'You have added new friend', data: myFriend.friends })
            }
        }
    }
    catch (error) {
        next(error)
    }
}
module.exports.removeFriend = async (req, res, next) => {
    if (req?.user?._id) {
        return res.status(400).json({ error: { email: 'User Credentials expired! Please login' } })
    }
    try {
        const friend = await Friend.findOne({ me: req?.user?._id, friend: req?.params?.id?.trim() });
        if (!friend) {
            return res.status(400).json({ error: { email: 'Could not find Friend list' } })
        }
        await User.findOneAndUpdate({
            _id: req?.user?._id,
            $pull: { friends: [req?.params?.id?.trim()] }
        }, { new: true })
        await Friend.deleteOne({ me: req?.user?._id, friend: req?.params?.id?.trim() }, function (err) {
            if (err) {
                return res.status(400).json({ error: { email: "Friend Remove failed!" } })
            }
            if (!err) {
                return res.status(200).json({ message: 'Friend Successfully Removed!' })
            }
            // deleted at most one tank document
        });
    }
    catch (error) {
        next(error)
    }
}