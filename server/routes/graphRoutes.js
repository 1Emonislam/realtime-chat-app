const express = require('express');
const { graphDahboard } = require('../controllers/graphControllers');

const { protect } = require('../middlewares/protect');
const router = express()
router.get('/dashboard', protect, graphDahboard)
module.exports = router;