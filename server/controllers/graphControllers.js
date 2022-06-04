const Message = require("../models/messageModel");

module.exports.messageCountWeak = async (req, res, next) => {
    try {
        const toWeek = new Date();
        toWeek.setDate(toWeek.getDate() - 23);
        const msgCount = await Message({ timestamp: { $gte: toWeek } }).count()
        return res.status(200).json({
            data: {
                toWeek:toWeek,
                msgCount:msgCount,
            }
        })

    }
    catch (error) {
        next(error)
    }

}