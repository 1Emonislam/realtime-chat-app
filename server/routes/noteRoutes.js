const express = require('express');
const { noteCreate, updateNote, getNote } = require('../controllers/noteControllers');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/', protect, noteCreate)
router.post('/:id', protect, updateNote)
router.get('/', protect,getNote)
module.exports = router;