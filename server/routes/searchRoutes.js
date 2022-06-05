const express = require('express');
const { searchUsers,actionUsers, blockUsers } = require('../controllers/searchControlllers');
const { protect } = require('../middlewares/protect');
const router = express();
router.get('/users', protect, searchUsers)
router.get('/users/blocks', protect, blockUsers)
router.get('/users/reports', protect, blockUsers)
router.post('/users/action', protect, actionUsers)
module.exports = router;