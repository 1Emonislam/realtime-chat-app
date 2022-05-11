const express = require('express');
const { sendMessage, allMessage, messageRemove, messageEdit, allMessageRemove } = require('../controllers/messageControllers');
const multer  = require('multer') //use multer to upload blob data
const upload = multer();
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/', protect, sendMessage)
router.delete('/', protect, messageRemove)
router.put('/', protect, messageEdit)
router.get('/:chatId', protect, allMessage)
router.delete('/:chatId', protect, allMessageRemove)
module.exports = router;