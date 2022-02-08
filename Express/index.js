const express = require("express")
const app = express()

app.get("/", (req, res) => {
    console.log("Main page")
    res.send("Welcome to the homepage")
})

app.post("/cat", (req, res) => {
    res.send("This is a post request")
})

app.get("/cat", (req, res) => {
    console.log("Cat requests")
    res.send("You have entered the world of cats")
})

app.get("/dog", (req, res) => {
    console.log("Dog requests")
    res.send("You have entered the world of dogs")
})

app.get("/r/:sub", (req, res) => {
    res.send(req.params.sub + " is a valid subreddit")
})

app.get("/search", (req, res) => {
    console.log(req.query)
    res.send("Query is received")
})

app.get("*", (req, res) => {
    console.log("Undefined route")
    res.send("This is not a defined route")
})

app.listen(8080, function(){
    console.log("Server is up and running!!")
})
