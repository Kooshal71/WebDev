const express = require("express")
const app = express()
const path = require("path")
const {v4: uuidv4} = require("uuid")
const methodOverride = require("method-override")

app.use(express.urlencoded({extended : true}))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(methodOverride("_method"))

let comments = [
    {
        id : 1,
        userName : "Todd",
        comment : "This is really funny!"
    },
    {
        id : 2,
        userName : "Toby",
        comment : "Michael loves me"
    },
    {
        id: 3,
        userName : "Jim",
        comment : "Dwight loves bears"
    },
    {
        id : 4,
        userName : "Michael",
        comment : "Thats what she said"
    }
]

app.get("/comments", (req, res) => {
    res.render("comments/index", {comments})
})

app.post("/comments", (req, res) => {
    const {userName, comment} = req.body
    comments.push({userName, comment, id:uuidv4()})
    res.redirect("/comments")
})

app.get("/comments/new", (req, res) => {
    // console.log(req.body)
    res.render("comments/new")
})

app.get("/comments/:id", (req, res) => {
    const id = req.params.id
    // console.log(id)
    const comment = comments.find(c => c.id == (id))
    console.log(comment)
    res.render("comments/show", {comment})
})

app.patch("/comments/:id", (req, res) => {
    const id = req.params.id
    const newComment = req.body.comment
    const foundComment = comments.find(c => c.id == id)
    foundComment.comment = newComment
    res.redirect("/comments")
    // res.send("Updating the comment")
})


app.get("/tacos", (req, res) => {
    res.send("GET /tacos response")
})

app.get("/comments/:id/edit", (req, res) => {
    const id = req.params.id
    const comment = comments.find(c => c.id == id)
    // console.log(comment)
    res.render("comments/edit", {comment})
})

app.delete("/comments/:id", (req, res) => {
    const id = req.params.id
    comments = comments.filter(c => c.id != id)
    res.redirect("/comments")
})

app.get("/fuck", (req, res) => {
    res.send("WTF is happening")
})

app.get("/fuck/:var", (req, res) => {
    res.send(req.params.var)
})

app.get("/fuck/:var/edit", (req, res) => {
    res.send("This is what i want")
})

app.post("/tacos", (req, res) => {
    console.log(req.body)
    // res.send("POST /tacos response")
    const{taco, quant} = req.body
    res.send(`This is your order \n ${quant} - ${taco}`)
})

app.listen(3030, () => console.log("Listening on server 3030"))