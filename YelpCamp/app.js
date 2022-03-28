const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const expressError = require("./utils/expressError")
const session = require("express-session")
const flash = require("connect-flash")

const campgrounds = require("./routes/campground")
const reviews = require("./routes/reviews")

mongoose.connect("mongodb://localhost:27017/yelp-camp", {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => {
    console.log("Database connected")
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
app.use(express.static(path.join(__dirname, "public")))
const sessionConfig = {
    secret:"Kewl",
    resave:false,
    saveUnitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge:1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use((req, res, next) => {
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")
    next()
})

app.use("/campgrounds", campgrounds)
app.use("/campgrounds/:id/reviews", reviews)

app.get("/", (req, res) => {
    res.render("home")
})


app.all("*", (req, res, next) => {
    next(new expressError("Page not found", 404))
})

app.use((err, req, res, next) => {
    const {status = 500, message = "Something went wrong"} = err
    res.status(status).render("errors", {err})
    // res.send("Something went wrong")
})

app.listen(3000, () => console.log("Server is running on port 3000"))
