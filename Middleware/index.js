const express = require("express")
const { get } = require("express/lib/response")
const app = express()
const morgan = require("morgan")
const appError = require("./appError")

app.use(morgan("tiny"))

const verifyPass = ("/secret", (req, res, next) => {
    const password = req.query.password
    if(password === "nuggets"){
        next()
    }
    // res.send("Sorry you need a password")
    throw new appError("Password is required", 401)
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

app.get("/error", (req, res) => {
    chicken.fly()
})

// app.use("/", (req, res, next) => {
//     console.log("This is another middleware")
//     return next()
// })

app.get("/", (req, res) => {
    res.send("Home Page")
})

app.get("/secret", verifyPass, (req, res) => {
    res.send("Lmao no secrets")
})

app.get("/dogs", (req, res) => {
    res.send("This is for dogs")
})

app.get("/admin", (req, res) => {
    throw new appError("You are not an admin", 403)
})

// All errors will be hitting this middleware
app.use((err, req, res, next) => {
    const status = err.status
    console.log(status)
    res.status(status).send(err.message)
})

app.listen(3000, () => {
    console.log("App is running on port 3000")
})