const express = require("express")
const app = express()
const User = require("./user")

app.set("view engine", "ejs")
app.set("views", "views")

app.get("/secret", (req, res) => {
    res.send("You cannot see me")
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.listen(3000, () => {
    console.log("Serving your app")
})