const Campground = require("../models/campground")
const Review = require("../models/review")

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find()
    res.render("campgrounds/index", {campgrounds})
}

module.exports.create = (req, res) => {
    res.render("campgrounds/new")
}

module.exports.edit =  async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render("campgrounds/edit", {campground})
}

module.exports.find = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path:"reviews",
        populate:{
            path:"author" //We need to nest the populate function
        }
    }).populate("author")
    // console.log(camp)
    // campground.populate()
    if(!campground){
        req.flash("error", ("Campground not found"))
        return res.redirect("/campgrounds")
    }
    res.render("campgrounds/show", {campground})
}

module.exports.postCreate =  async (req, res, next) => {
    // if(!req.body.campground) throw new expressError("Invalid Data", 400)
    const campground = new Campground(req.body)
    console.log(campground)
    campground.author = req.user._id
    // console.log(campground.image, campground.id)
    await campground.save()
    req.flash("success", "successfully made a new campground")
    res.redirect(`/campgrounds/${campground.id}`)
}

module.exports.postReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    res.redirect(`/campgrounds/${campground.id}`)
}

module.exports.postEdit = async(req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body, {new:true})
    console.log(campground)
    req.flash("success", ("Successfully Updated campground"))
    res.redirect(`/campgrounds/${campground.id}`)
}

module.exports.delete =  async(req, res) => {
    const campground = await Campground.findByIdAndDelete(req.params.id)
    res.redirect("/campgrounds")
}