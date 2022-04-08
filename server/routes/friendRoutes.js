const express = require('express');
const { addFriend } = require('../controllers/friendControllers');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/add',protect,addFriend)
router.put('/remove',protect)
module.exports = router;