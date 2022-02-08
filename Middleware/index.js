const express = require("express")
const { get } = require("express/lib/response")
const app = express()
const morgan = require("morgan")

app.use(morgan("tiny"))

const verifyPass = ("/secret", (req, res, next) => {
    const password = req.query.password
    if(password === "nuggets"){
        next()
    }
    res.send("Sorry you need a password")
    // res.status(404).send("Webpage not found")
})

app.use((req, res, next) => {
    req.method = "GET"
    console.log(req.method.toUpperCase(), req.path)
    return next()
    // console.log("After next function")
})

app.use("/dogs", (req, res, next) => {
    console.log("This is to check")
    next()
})

// app.use("/", (req, res, next) => {
//     console.log("This is another middleware")
//     return next()
// })

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.get("/secret", verifyPass, (req, res) => {
    res.send("These new earphones are 10k wtf")
})

app.get("/dogs", (req, res) => {
    res.send("This is for dogs")
})

app.listen(3000, () => {
    console.log("App is running on port 3000")
})