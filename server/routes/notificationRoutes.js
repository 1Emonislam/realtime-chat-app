const express = require('express');
const { protect } = require('../middlewares/protect');
const GroupNotification = require('../models/groupNotificationModel');

const router = express.Router();
router.get('/get/notification', protect, async (req, res, next) => {
    try {
        const myNotification = await GroupNotification.find({ receiver: req.user?._id }).populate("chat", "_id chatName img").populate("message", "_id content").sort("-createdAt").limit(50);
        const myunread = await GroupNotification.find({ receiver: req.user?._id, seen: false }).count();
        return res.status(200).json({ data: myNotification, myunread })
    }
    catch (error) {
        next(error)
    }
})
router.get('/get/notification/:id', protect, async (req, res, next) => {
    try {
        const myNotification = await GroupNotification.updateMany({ chat: req.params?.id }, {
            seen: true,
            lastSeen: new Date(),
        }, { new: true }).sort("-createdAt").limit(50).populate("chat", "_id chatName img").populate("message", "_id content");
        const myunread = await GroupNotification.find({ receiver: req.user?._id, seen: false }).count();
        // console.log(myunread)
        return res.status(200).json({ data: myNotification, myunread })
    } catch (error) {
        next(error)
    }
})
router.get('/get/notificationUnseen', protect, async (req, res, next) => {
    try {
        const myNotification = await GroupNotification.find({ receiver: req.user?._id, seen: false }).populate("chat", "_id chatName img").populate("message", "_id content").sort("-createdAt").limit(50);
        const myunread = await GroupNotification.find({ receiver: req.user?._id, seen: false }).count();
        return res.status(200).json({ data: myNotification, myunread })
    }
    catch (error) {
        next(error)
    }
})
router.get('/get/notificationSeen', protect, async (req, res, next) => {
    try {
        const myNotification = await GroupNotification.find({ receiver: req.user?._id, seen: true }).populate("chat", "_id chatName img").populate("message", "_id content").sort("-createdAt").limit(50);
        const myunread = await GroupNotification.find({ receiver: req.user?._id, seen: false }).count();
        return res.status(200).json({ data: myNotification, myunread })
    }
    catch (error) {
        next(error)
    }
})
module.exports = router;