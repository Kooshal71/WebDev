const express = require("express")
const passport = require("passport")
const router = express.Router()
const catchAsync = require("../utils/wrapAsync")
const users = require("../controllers/users")

router.route("/login")
    .get(users.login)
    .post(passport.authenticate("local", {failureFlash:true, failureRedirect:"/login"}), users.postLogin)

router.route("/register")
    .get(users.register)
    .post(catchAsync(users.postRegister))

router.get("/logout", users.logout)

module.exports = router;