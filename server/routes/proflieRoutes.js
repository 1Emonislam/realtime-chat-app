const { privateProfileGet, publicProfileGet, profileUpdate } = require("../controllers/profileControllers");
const { protect } = require("../middlewares/protect");
const express = require("express");
const router = express.Router()
router.get('/', protect, privateProfileGet);
router.get('/:id', protect, publicProfileGet);
router.put('/update', protect, profileUpdate)
module.exports = router;