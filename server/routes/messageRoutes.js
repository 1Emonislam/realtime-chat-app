const express = require('express');
const { sendMessage, allMessage } = require('../controllers/messageControllers');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/message').post(protect, sendMessage)
router.get('/message/:chatId').get(protect, allMessage);
module.exports = router;