const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
app.use(cookieParser("abc"))

app.get("/greet", (req, res) => {
    const {name = "xyz"} = req.cookies
    res.send(`Hey There ${name}`)
})

app.get("/setName", (req, res) => {
    res.cookie("name", "stevie")
    console.log(req.cookies)
    res.send("cookies in action")
})

app.get("/getSigned", (req, res) => {
    res.cookie("fruit", "grape", {signed:true})
    res.send("This is signed")
})

app.get("/verifyFruit", (req, res) => {
    console.log(req.cookies)
    res.send(req.signedCookies)
})

app.listen(3000, () => console.log("Listening on 3000"))