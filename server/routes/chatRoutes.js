
const express = require('express');
const { acessChat, getChat, groupCreate, groupRename, groupAddTo, groupMemberRemoveTo, groupAddToInviteSent, getSingleChatMembers, groupInviteAccept, singleGroupDelete, makeAdminChatMembers, removeAdminChatMembers, mediaFilesSearch, inviteCheck } = require('../controllers/chatControlles');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/', protect, acessChat)
router.get('/', protect, getChat)
router.get('/:chatId', protect, getSingleChatMembers)
router.put('/group/addTo', protect, groupAddTo)
router.put('/', protect, groupRename)
router.post('/invite', protect, inviteCheck)
router.post('/group/create', protect, groupCreate)
router.delete('/group/delete', protect, singleGroupDelete)
router.post('/group/invite/gen', protect, groupAddToInviteSent)
router.put('/make-admin/:chatId', protect, makeAdminChatMembers)
router.put('/remove-admin/:chatId', protect, removeAdminChatMembers)
router.put('/group/member/removeTo', protect, groupMemberRemoveTo)
router.get('/media/files/search', protect, mediaFilesSearch)
router.put('/group/invite/verify/:id', protect, groupInviteAccept)
module.exports = router;