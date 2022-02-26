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
// const review = require("./models/review")

db.on("error", console.error.bind(console, "connection error"))
db.once("open", () => {
    console.log("Database connected")
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.engine("ejs", ejsMate)

const validateCampground = (req, res, next) => {
    const campgroundSchemx = campgroundSchema.campgroundSchema;
    console.log(req.body)
    const result = campgroundSchemx.validate(req.body)
    console.log(result)
    if(result.error){
        const msg = result.error.details.map(el => el.message).join(",")
        throw new expressError(msg, 400)
    }else{
        next()
    }
}

const validateReview = (req, res, next) => {
    const result = reviewSchema.validate(req.body);
    if(result.error){
        const msg = error.details.map(el => el.message).join(",")
        throw new expressError(msg, 400)
    }
    else{
        next()
    }
}

app.post("/campgrounds/:id/reviews", catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    res.redirect(`/campgrounds/${campground.id}`)
}))


app.get("/", (req, res) => {
    res.render("home")
})

app.get("/campgrounds", catchAsync(async (req, res) => {
    const campgrounds = await Campground.find()
    res.render("campgrounds/index", {campgrounds})
}))

app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new")
})


app.get("/campgrounds/:id/edit", catchAsync( async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render("campgrounds/edit", {campground})
}))

app.get("/campgrounds/:id", catchAsync( async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate("reviews")
    // campground.populate()
    res.render("campgrounds/show", {campground})
}))


app.post("/campgrounds", validateCampground,  catchAsync( async (req, res, next) => {
    // if(!req.body.campground) throw new expressError("Invalid Data", 400)
    const campground = new Campground(req.body)
    console.log(campground)
    // console.log(campground.image, campground.id)
    await campground.save()
    res.redirect(`/campgrounds/${campground.id}`)
}))

app.put("/campgrounds/:id", catchAsync (async(req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body, {new:true})
    console.log(campground)
    res.redirect(`/campgrounds/${campground.id}`)
}))

app.delete("/campgrounds/:id/reviews/:reviewId", catchAsync( async(req, res) => {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(req.params.reviewId)
    res.redirect(`/campgrounds/${id}`)
    // res.send("This will delete")
}))

app.delete("/campgrounds/:id", catchAsync( async(req, res) => {
    const campground = await Campground.findByIdAndDelete(req.params.id)
    res.redirect("/campgrounds")
    // res.send("Heello")
}))

app.all("*", (req, res, next) => {
    next(new expressError("Page not found", 404))
})

app.use((err, req, res, next) => {
    const {status = 500, message = "Something went wrong"} = err
    res.status(status).render("errors", {err})
    // res.send("Something went wrong")
})

app.listen(3000, () => console.log("Server is running on port 3000"))