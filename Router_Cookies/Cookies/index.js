const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")

app.get("/greet", (req, res) => {
    const {name = "xyz"} = req.cookies
    res.send(`Hey There ${name}`)
})

app.get("/setName", (req, res) => {
    res.cookie("name", "stevie")
    console.log(req.cookies)
    res.send("cookies in action")
})

app.listen(3000, () => console.log("Listening on 3000"))