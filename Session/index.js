const express = require("express")
const app = express()
const session = require("express-session")

const sessionOptions = {secret:"lulz", resave:false, saveUninitialized:false}
app.use(session(sessionOptions))

app.get("/pageViews", (req, res) => {
    if(req.session.count){
        req.session.count +=1
    }
    else{
        req.session.count = 1
    }
    res.send(`You have viewed this page ${req.session.count} times`)
})

app.get("/register", (req, res) => {
    const {userName = "dum"} = req.query
    req.session.userName = userName
    res.redirect("/greet")
})

app.get("/greet", (req, res) => {
    const {userName} = req.session
    res.send(`Welcome back ${userName}`)
})

app.listen(3000, () => console.log("Listening on 3000"))