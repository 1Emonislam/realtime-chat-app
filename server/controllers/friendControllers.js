const User = require('../models/userModel');
const Notificatin = require('../models/notificationModel');
const Friend = require('./FriendModel');
exports.getFriends = async (req, res, next) => {
    let { id } = req.params
    try {
        let user = await User.aggregate([
            { "$match": { "_id": ObjectId(id) } },
            {
                "$lookup": {
                    "from": User.collection.name,
                    "let": { "friends": "$friends" },
                    "pipeline": [
                        {
                            "$match": {
                                "friends.status": 1,
                            }
                        },
                        {
                            "$project": {
                                "name": 1,
                                "email": 1,
                                "pic": 1
                            }
                        }
                    ],
                    "as": "friends"
                }
            },
        ])

        res.status(200).json({
            data: user
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports.addFriend = async (req, res, next) => {
    const issue = {};
    const username = req.body?.username?.toLowerCase();
    const email = req.body?.email?.toLowerCase();
    const phone = req.body?.phone;
    if (!(req?.user?._id)) {
        issue.email = 'User Credentials expired! Please login'
    }
    const checkUser = await username || phone || email || req?.params?.id?.trim();
    try {
        const friend = await User.findOne({ checkUser });
        if (!friend) {
            issue.username = 'Could not find user please provide email or phone number or username';
        }
        const friendExits = await User.findOne({ _id: req?.user?._id, friends: friend?._id })
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
            })
            await Notificatin.create(notifyPayload);
            const resDatafriend = await User.findOne({ _id: req.user?._id }).populate('friends');
            if (resDatafriend) {
                return res.status(200).json({ message: 'You have added new friend', data: resDatafriend.friends })
            }
        }
    }
    catch (error) {
        next(error)
    }
} 