const User = require('../models/userModel')
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
    if (!(req?.user?._id)) {
        issue.email = 'User Credentials expired! Please login'
    }
    try {
        const user = await User.findOne({ _id: req?.params?.id?.trim() });
        if (!user) {
            issue?.username = 'Could not find user please provide email or phone number or username';
        }
        if (Object.keys(issue)?.length) {
            return res.status(400).json({ error: issue })
        }
        if (user) {
            const payload = {
                user: req?.params?.id?.trim()
            }
            const friendAdd = await User.findOneAndUpdate({ _id: req?.params?.id?.trim() }, {
                $addToSet: { friends: [payload] }
            })
            return res.status(200).json({ message: 'You have added new friend', data: friendAdd })
        }
    }
    catch (error) {

    }
} 