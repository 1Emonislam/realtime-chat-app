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
    const { username, phone } = req.body;
    let checkUser = username || phone;
    try {
        const user = await User.findOne({ _id: req?.user?._id });

    }
    catch (error) {

    }
} 