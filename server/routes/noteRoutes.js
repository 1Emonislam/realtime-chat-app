const express = require('express');
const { noteCreate, updateNote } = require('../controllers/noteControllers');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/', protect, noteCreate)
router.post('/:id', protect, updateNote)
router.get('/', protect,)
module.exports = router;