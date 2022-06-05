const express = require('express');
const { searchUsers, blockUsers } = require('../controllers/searchControlllers');
const { protect } = require('../middlewares/protect');
const router = express();
router.get('/users', protect, searchUsers)
router.get('/users/blocks', protect, blockUsers)
router.get('/users/reports', protect, blockUsers)
module.exports = router;