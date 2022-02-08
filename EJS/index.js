const express = require("express")
const app = express()
const path = require("path")

app.use(express.static(path.join(__dirname, "/public")))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
// app.set("public")
app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.get("/rand", (req, res) => {
    const num = Math.floor(Math.random()*10)+1
    res.render("random.ejs", {rand : num})
})

app.get("/r/:subreddit", (req, res) => {
    const {subreddit} = req.params
    res.render("subreddit.ejs", {subreddit})
})

app.get("/dogs", (req, res) => {
    const dogs = ["Simba", "Ebony", "Rocky", "Blackie"]
    res.render("dogs.ejs", {dogs})
})
app.listen(8080, () => console.log("Server is running on 8080"))