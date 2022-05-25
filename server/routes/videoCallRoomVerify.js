const { protect } = require('../middlewares/protect');
const Chat = require('../models/chatModel')
const router = require('express').Router()
router.post('/group-call-verify/:id', protect, async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(req.user)
        const exists = await Chat.findOne({ _id: id, members: req.user?._id });
        if (exists) {
            res.status(200).json({ permission: true })
        } else {
            res.status(400).json({ permission: false })
        }
    }
    catch (error) {
        res.status(400).json({ permission: false })
    }
})
module.exports = router;