const express = require('express');
const { searchUsers } = require('../controllers/searchControlllers');
const { protect } = require('../middlewares/protect');
const router = express();
router.route('/users', protect, searchUsers)
module.exports = router;