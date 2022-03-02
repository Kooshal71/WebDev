const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/yelp-camp", {useNewUrlParser:true, useUnifiedTopology:true})
const Campground = require("./models/campground")
const res = require("express/lib/response")
const methodOverride = require("method-override")
const db = mongoose.connection
const ejsMate = require("ejs-mate")
const catchAsync = require("./utils/wrapAsync")
const expressError = require("./utils/expressError")
const {campgroundSchema, reviewSchema} = require("./schemas")
const Review = require("./models/review")
const campground = require("./models/campground")
const campgrounds = require("./routes/campground")
const reviews = require("./routes/reviews")

db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => {
    console.log("Database connected")
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)
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