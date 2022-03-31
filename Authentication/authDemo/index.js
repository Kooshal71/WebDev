const express = require("express")
const app = express()
const User = require("./user")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { hash } = require("bcrypt")
const session = require("express-session")

mongoose.connect("mongodb://localhost:27017/authDemo", {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        console.log("Connection Open!")
    })
    .catch(err => {
        console.log("OH no error")
        console.log(err)
    })

app.set("view engine", "ejs")
app.set("views", "views")

app.use(express.urlencoded({extended:true}))
app.use(session({secret:"ggs"}))

const requireLogin = (req, res, next) => {
    if(!req.session.user_id){
        return res.redirect("/login")
    }
    next()
}

app.post("/register", async(req, res) => {
    const {password, username} = req.body
    const user = new User({username,password})
    await user.save()
    console.log(user.password)
    req.session.user_id = user.id
    res.redirect("/")
})

app.post("/login", async(req, res) => {
    const {password, username} = req.body
    const user = User.findAndValidate(username, password)
    if(user){
        req.session.user_id = user.id
        res.render("secret")
    }
    else{
        res.send("Try again")
    }
})

app.get("/", (req, res) => {
    res.send("This is home page")
})

app.get("/secret",  requireLogin,(req, res) => {
    res.send("This cannot be accessed without login")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.post("/logout", (req, res) => {
    req.session.user_id = null
    res.redirect("/login")
})

app.listen(3000, () => {
    console.log("Serving your app")
})