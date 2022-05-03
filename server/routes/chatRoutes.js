
const express = require('express');
const { acessChat, getChat, groupCreate, groupRename, groupAddTo, groupRemoveTo, groupAddToInviteSent, getSingleChatMembers } = require('../controllers/chatControlles');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/', protect, acessChat)
router.get('/', protect, getChat)
router.get('/:chatId', protect, getSingleChatMembers)
router.put('/group/addTo', protect, groupAddTo)
router.put('/group/rename', protect, groupRename)
router.post('/group/create', protect, groupCreate)
router.put('/group/removeTo', protect, groupRemoveTo)
router.post('/group/invite/gen', protect, groupAddToInviteSent)
module.exports = router;