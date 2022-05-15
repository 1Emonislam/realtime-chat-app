const express = require('express');
const { sendMessage, allMessage, messageRemove, messageEdit, allMessageRemove, sendFilesUploadMessage } = require('../controllers/messageControllers');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/', protect, sendMessage)
router.delete('/', protect, messageRemove)
router.put('/', protect, messageEdit)
router.get('/:chatId', protect, allMessage)
router.delete('/:chatId', protect, allMessageRemove)
router.post('/all/upload/:id', protect,sendFilesUploadMessage)
module.exports = router;