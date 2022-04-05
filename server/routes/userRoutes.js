const { register } = require('../controllers/userControllers');
const router = require('express').Router();
router.post("/", register)
module.exports = router;