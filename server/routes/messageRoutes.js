const express = require('express');
const { sendMessage, allMessage } = require('../controllers/messageControllers');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/',protect,sendMessage)
router.get('/:chatId',protect,allMessage)
router.delete('/:chatId',protect)
router.put('/:chatId',protect)
module.exports = router;