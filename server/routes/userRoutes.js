const { userRegister, userLogin, changedPassword } = require('../controllers/userControllers');
const { protect } = require('../middlewares/protect');
const router = require('express').Router();
router.post("/register", userRegister)
router.post("/login", userLogin)
router.put("/change-password", protect, changedPassword)
module.exports = router;