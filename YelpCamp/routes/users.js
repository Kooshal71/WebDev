const express = require("express")
const passport = require("passport")
const router = express.Router()
const User = require("../models/user")
const catchAsync = require("../utils/wrapAsync")

router.get("/register", (req, res) => {
    res.render("users/register")
})

router.post("/login", passport.authenticate("local", {failureFlash:true, failureRedirect:"/login"}), async(req, res) => {
    req.flash("success", "welcome back")
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
})

router.post("/register", catchAsync(async (req, res, next) => {
    try{
    const {email, username, password} = req.body
    const user = new User({email, username})
    const registeredUser = await User.register(user, password)
    console.log(registeredUser, err => {
        if(err){
            return next(err)
        }
    })
    req.login(registeredUser)
    req.flash("success", "Welcome to YelpCamp")
    res.redirect("/campgrounds")
    }catch(e){
        req.flash("error", e.message)
        res.redirect("register")
    }
}))

router.get("/login", (req, res) => {
    res.render("users/login")
})

router.get("/logout", (req, res) => {
    req.logOut()
    req.flash("success", "Goodbye!")
    res.redirect("/campgrounds")
})

module.exports = router;