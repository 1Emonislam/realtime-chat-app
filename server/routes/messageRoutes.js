const express = require('express');
const { sendMessage, allMessage, messageRemove, messageEdit } = require('../controllers/messageControllers');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/', protect, sendMessage)
router.delete('/', protect, messageRemove)
router.put('/', protect, messageEdit)
router.get('/:chatId', protect, allMessage)
module.exports = router;