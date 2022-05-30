const express = require('express');
const { noteCreate, updateNote, getNote } = require('../controllers/noteControllers');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.post('/', protect, noteCreate)
router.put('/:id', protect, updateNote)
router.post('/actions', protect,getNote)
module.exports = router;