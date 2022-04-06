const User = require("../models/user")

module.exports.register =  (req, res) => {
    res.render("users/register")
}

module.exports.postLogin = async(req, res) => {
    req.flash("success", "welcome back")
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}

module.exports.postRegister = async (req, res, next) => {
    try{
    const {email, username, password} = req.body
    const user = new User({email, username})
    const registeredUser = await User.register(user, password)
    console.log(registeredUser, err => {
        if(err){
            return next(err)
        }
    })
    req.login(registeredUser, () => console.log("Logged in"))
    req.flash("success", "Welcome to YelpCamp")
    res.redirect("/campgrounds")
    }catch(e){
        req.flash("error", e.message)
        res.redirect("register")
    }
}

module.exports.login = (req, res) => {
    res.render("users/login")
}

module.exports.logout =  (req, res) => {
    req.logOut()
    req.flash("success", "Goodbye!")
    res.redirect("/campgrounds")
}