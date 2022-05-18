const express = require('express');
const { protect } = require('../middlewares/protect');
const GroupNotification = require('../models/groupNotificationModel');
const User = require('../models/userModel');

const router = express.Router();
router.put('/already/notification', protect, async (req, res, next) => {
    try {
        const { chatId, userId, messageId } = req.body;
        if (!(chatId || userId || messageId || req.user?._id)) {
            return res.status(200).json({ message: 'Notification Trigger!' })
        }
        await GroupNotification.deleteOne({ chat: chatId, receiver: req.user?._id, message: messageId });
        return res.status(200).json({ message: 'Notification Trigger Success!' })
    }
    catch (error) {
        next(error)
    }
})
router.get('/get/notification', protect, async (req, res, next) => {
    try {
        const myNotification = await GroupNotification.find({ receiver: req.user?._id }).sort("-createdAt").limit(200).populate("chat", "_id chatName img").populate("message", "_id content").populate("sender", "_id firstName lastName")
        const myunread = await GroupNotification.find({ receiver: req.user?._id, seen: false }).count();
        return res.status(200).json({ data: myNotification, myunread })
    }
    catch (error) {
        next(error)
    }
})
router.get('/get/notification/:id', protect, async (req, res, next) => {
    try {
        await GroupNotification.updateMany({ chat: req.params?.id, receiver: req.user?._id}, {
            seen: true,
            lastSeen: new Date(),
        }, { new: true })
        const myNotification = await GroupNotification.find({ chat: req.params?.id, receiver: req.user?._id }).sort("-createdAt").limit(50).populate("sender", "_id firstName lastName").populate("chat", "_id chatName img").populate("message", "_id content");
        const myunread = await GroupNotification.find({ receiver: req.user?._id, seen: false }).count();
        // console.log(myunread)
        return res.status(200).json({ data: myNotification, myunread })
    } catch (error) {
        next(error)
    }
})
router.get('/get/notificationUnseen', protect, async (req, res, next) => {
    try {
        const myNotification = await GroupNotification.find({ receiver: req.user?._id, seen: false }).populate("sender", "_id firstName lastName").populate("chat", "_id chatName img").populate("message", "_id content").sort("-createdAt").limit(50);
        const myunread = await GroupNotification.find({ receiver: req.user?._id, seen: false }).count();
        return res.status(200).json({ data: myNotification, myunread })
    }
    catch (error) {
        next(error)
    }
})
router.get('/get/notificationSeen', protect, async (req, res, next) => {
    try {
        const myNotification = await GroupNotification.find({ receiver: req.user?._id, seen: true }).populate("sender", "_id firstName lastName").populate("chat", "_id chatName img").populate("message", "_id content").sort("-createdAt").limit(50);
        const myunread = await GroupNotification.find({ receiver: req.user?._id, seen: false }).count();
        return res.status(200).json({ data: myNotification, myunread })
    }
    catch (error) {
        next(error)
    }
})
module.exports = router;