const express = require("express");
const router = express.Router();
const userContro = require('../controllers/user')

const isAuth = require('../middleware/isauth')

router.post("/user/signup", userContro.signup);
router.post("/user/login", userContro.login);
router.get("/user/logout",isAuth, userContro.logout);
router.post("/user/change-password",isAuth, userContro.changePass);


module.exports = router;
