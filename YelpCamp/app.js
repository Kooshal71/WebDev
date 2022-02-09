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

db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => {
    console.log("Database connected")
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find()
    res.render("campgrounds/index", {campgrounds})
})

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new")
})

app.get("/campgrounds/:id", async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render("campgrounds/show", {campground})
})

app.get("/campgrounds/:id/edit", async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render("campgrounds/edit", {campground})
})

app.post("/campgrounds", async (req, res) => {
    // res.send(req.body)
    try{
    const campground = new Campground(req.body)
    console.log(campground)
    await campground.save()
    res.redirect(`/campgrounds/${campground.id}`)
    }
    catch(e)
    {
        next(e)
    }
})

app.put("/campgrounds/:id", async(req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body, {new:true})
    console.log(campground)
    res.redirect(`/campgrounds/${campground.id}`)
})

app.delete("/campgrounds/:id", async(req, res) => {
    const campground = await Campground.findByIdAndDelete(req.params.id)
    res.redirect("/campgrounds")
    // res.send("Heello")
})

app.use((err, req, res, next) => {
    res.send("Something went wrong")
})

app.listen(3000, () => console.log("Server is running on port 3000"))