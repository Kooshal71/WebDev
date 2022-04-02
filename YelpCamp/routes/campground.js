const express = require("express")
const router = express.Router()
const catchAsync = require("../utils/wrapAsync")
const expressError = require("../utils/expressError")
const Campground = require("../models/campground")
const schema = require("../schemas")
const campgroundSchema = schema.campgroundSchema
const Review = require("../models/review")
const isLoggedIn = require("../middleware")

const validateCampground = (req, res, next) => {
    // const campgroundSchemx = campgroundSchemas.campgroundSchema;
    // console.log(req.body)
    const result = campgroundSchema.validate(req.body)
    console.log(result)
    if(result.error){
        const msg = result.error.details.map(el => el.message).join(",")
        throw new expressError(msg, 400)
    }else{
        next()
    }
}


router.post("/campgrounds/:id/reviews", isLoggedIn,catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    res.redirect(`/campgrounds/${campground.id}`)
}))


// router.get("/", (req, res) => {
//     res.render("home")
// })

router.get("/", catchAsync(async (req, res) => {
    const campgrounds = await Campground.find()
    res.render("campgrounds/index", {campgrounds})
}))

router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new")
})


router.get("/:id/edit", isLoggedIn, catchAsync( async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render("campgrounds/edit", {campground})
}))

router.get("/:id", catchAsync( async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate("reviews")
    // campground.populate()
    if(!campground){
        req.flash("error", ("Campground not found"))
        return res.redirect("/campgrounds")
    }
    res.render("campgrounds/show", {campground})
}))


router.post("/", isLoggedIn, validateCampground,catchAsync( async (req, res, next) => {
    // if(!req.body.campground) throw new expressError("Invalid Data", 400)
    const campground = new Campground(req.body)
    console.log(campground)
    // console.log(campground.image, campground.id)
    await campground.save()
    req.flash("success", "successfully made a new campground")
    res.redirect(`/campgrounds/${campground.id}`)
}))

router.put("/:id", catchAsync (async(req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body, {new:true})
    console.log(campground)
    req.flash("success", ("Successfully Updated campground"))
    res.redirect(`/campgrounds/${campground.id}`)
}))


router.delete("/:id", catchAsync( async(req, res) => {
    const campground = await Campground.findByIdAndDelete(req.params.id)
    res.redirect("/campgrounds")
    // res.send("Heello")
}))

module.exports = router