const { userRegister, userLogin } = require('../controllers/userControllers');
const router = require('express').Router();
router.post("/register", userRegister)
router.post("/login", userLogin)
module.exports = router;