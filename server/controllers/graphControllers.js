const Chat = require("../models/chatModel");
const ViewsChat = require("../models/ChatViewsModel");
const JoinGroup = require("../models/JoinGroupModel");
const Message = require("../models/messageModel");

module.exports.graphDahboard = async (req, res, next) => {
    try {
        const toWeek = new Date();
        toWeek.setDate(toWeek.getDate() - 23);
        //today
        const todayMsgCount = await Message.find({ timestamp: { $gte: new Date() }, sender: req.user?._id }).count()
        const todayJoinGroupCount = await JoinGroup.find({ timestamp: { $gte: new Date() }, userJoin: req.user?._id }).count()
        const todayvisitorCount = await ViewsChat.find({ timestamp: { $gte: new Date() }, user: req.user?._id }).count()
        const todayCreateGroup = await Chat.find({ timestamp: { $gte: new Date() }, members: req.user?._id }).count()
        //week
        const weekMsgCount = await Message.find({ timestamp: { $gte: toWeek }, sender: req.user?._id }).count()
        const weekJoinGroupCount = await JoinGroup.find({ timestamp: { $gte: toWeek }, userJoin: req.user?._id }).count()
        const weekvisitor = await ViewsChat.find({ timestamp: { $gte: toWeek }, user: req.user?._id }).count()
        const weekCreateGroup = await Chat.find({ timestamp: { $gte: toWeek }, members: req.user?._id }).count()
        //views chat

        const dashGraph = {
            todayDate: new Date(),
            weekDate: toWeek,
            today: {
                msgCount: todayMsgCount,
                joinGroupCount: todayJoinGroupCount,
                visitorCount: todayvisitorCount,
                createGroupCount: todayCreateGroup
            },
            week: {
                msgCount: weekMsgCount,
                joinGroupCount: weekJoinGroupCount,
                visitorCount: weekvisitor,
                createGroupCount: weekCreateGroup
            }
        }
        return res.status(200).json(dashGraph)

    }
    catch (error) {
        next(error)
    }

}