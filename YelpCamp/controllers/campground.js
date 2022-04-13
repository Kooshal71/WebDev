const Campground = require("../models/campground")
const Review = require("../models/review")
const {cloudinary} = require("../cloudinary")
const mpxGeocoding = require ("@mapbox/mapbox-sdk/services/geocoding")
const mapboxToken = process.env.MAPBOX_TOKEN
const geocoder = mpxGeocoding({accessToken:mapboxToken})

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
    const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit:1
    }).send()
    // res.send("GGS")
    const campground = new Campground(req.body)
    campground.geometry = geoData.body.features[0].geometry
    // console.log(campground)
    campground.author = req.user._id
    campground.images = req.files.map(f => ({url: f.path, fileName:f.filename}))
    // console.log(campground.image, campground.id)
    await campground.save()
    console.log(campground)
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
    // console.log("new one\n\n",req.body)
    const campground = await Campground.findByIdAndUpdate(req.params.id, req.body, {new:true})
    const imgs = req.files.map(f => ({url: f.path, fileName:f.filename}))
    // console.log("Im in Edit Route",imgs)
    await campground.images.push(...imgs)
    await campground.save()
    if(req.body.deleteImages){
        // console.log("\n\n\n Inside the condition \n\n\n")
        // console.log(req.body.deleteImages)
        for(let fileName of req.body.deleteImages){
            await cloudinary.uploader.destroy(fileName)
        }
        await campground.updateOne({$pull: {images: {fileName: {$in: req.body.deleteImages}}}})
        // console.log(campground)
    }
    // console.log(campground)
    req.flash("success", ("Successfully Updated campground"))
    res.redirect(`/campgrounds/${campground.id}`)
}

module.exports.delete =  async(req, res) => {
    const campground = await Campground.findByIdAndDelete(req.params.id)
    res.redirect("/campgrounds")
}