
const express = require('express');
const { acessChat, getChat, groupCreate, groupRename, groupAddTo, groupMemberRemoveTo, groupAddToInviteSent, getSingleChatMembers, groupInviteAccept, singleGroupDelete } = require('../controllers/chatControlles');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/', protect, acessChat)
router.get('/', protect, getChat)
router.get('/:chatId', protect, getSingleChatMembers)
router.put('/group/addTo', protect, groupAddTo)
router.put('/group/rename', protect, groupRename)
router.post('/group/create', protect, groupCreate)
router.delete('/group/delete',protect,singleGroupDelete)
router.post('/group/invite/gen', protect, groupAddToInviteSent)
router.put('/group/member/removeTo', protect, groupMemberRemoveTo)
router.put('/group/invite/verify/:id', protect, groupInviteAccept)
module.exports = router;