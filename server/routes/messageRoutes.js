const express = require('express');
const { sendMessage, allMessage } = require('../controllers/messageControllers');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/message',protect,sendMessage)
router.get('/message/:chatId',protect,allMessage)
router.delete('/message/:chatId',protect)
router.put('/message/:chatId',protect)
module.exports = router;