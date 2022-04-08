
const express = require('express');
const { acessChat,getChat, groupCreate, groupRename, groupAddTo, groupRemoveTo } = require('../controllers/chatControlles');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/', protect, acessChat)
router.get('/', protect,getChat)
router.put('/group/addTo', protect, groupAddTo)
router.put('/group/rename', protect, groupRename)
router.post('/group/create', protect, groupCreate)
router.put('/group/removeTo', protect, groupRemoveTo)
module.exports = router;