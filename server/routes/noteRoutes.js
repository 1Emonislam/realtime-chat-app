const express = require('express');
const { noteCreate } = require('../controllers/noteControllers');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/',protect, noteCreate)
router.get('/',protect,)
module.exports = router;