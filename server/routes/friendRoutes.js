const express = require('express');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/add',protect)
router.put('/remove',protect)
module.exports = router;