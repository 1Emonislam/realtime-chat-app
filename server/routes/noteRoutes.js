const express = require('express');
const { noteCreate, updateNote, getNote, deleteSingleNote, allRemoveNote } = require('../controllers/noteControllers');
const { protect } = require('../middlewares/protect');
const router = express.Router();
router.delete('/', protect, allRemoveNote)
router.post('/', protect, noteCreate)
router.put('/:id', protect, updateNote)
router.post('/actions', protect, getNote);
router.delete('/trash/:id', protect, deleteSingleNote)
module.exports = router;