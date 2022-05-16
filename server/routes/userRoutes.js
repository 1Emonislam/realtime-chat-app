const { userRegister, userLogin, changedPassword, forgetPassword, resetPassword, logOut, updateProfile, currentProfileGet, allUserSearch,singleProfileGet } = require('../controllers/userControllers');
const { protect } = require('../middlewares/protect');
const router = require('express').Router();
router.post("/register", userRegister)
router.post("/login", userLogin)
router.put("/update", protect, updateProfile)
router.post("/logout", protect, logOut)
router.put("/change-password", protect, changedPassword);
router.post("/forget-password", forgetPassword);
router.put("/reset-password", protect, resetPassword);
router.get("/my/profile", protect, currentProfileGet)
router.get("/all/users/search", protect, allUserSearch);
router.get("/single/profile/get/:id", protect, singleProfileGet)
module.exports = router;