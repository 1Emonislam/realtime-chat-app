const express = require('express');
const { addFriend, getFriends, removeFriend } = require('../controllers/friendControllers');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/add', protect, addFriend)
router.get('/my', protect,getFriends)
router.put('/remove', protect,removeFriend)
module.exports = router;