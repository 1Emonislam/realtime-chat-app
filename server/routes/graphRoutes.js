const express = require('express');
const { messageCountWeak } = require('../controllers/graphControllers');
const { protect } = require('../middlewares/protect');
const router = express()
router.get('/toWeekMessage',protect,messageCountWeak)
module.exports = router;