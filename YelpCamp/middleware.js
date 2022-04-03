const {campgroundSchema, reviewSchema} = require("./schemas")
const expressError = require("./utils/expressError")
const Campground = require("./models/campground")
const Review = require("./models/review")

const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        // console.log(req.originalUrl)
        req.flash("error", "You must be signed in")
        return res.redirect("/login")
    }
    next()
}

module.exports = isLoggedIn

module.exports.validateCampground = (req, res, next) => {
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

module.exports.isAuthor = async(req, res, next) => {
    const {id} = req.params;
    let campground = await Campground.findById(id)
    console.log(campground.author ,req.user.id)
    if(!(campground.author.equals(req.user._id)))
    {
        req.flash("error", "You are not the User")
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

module.exports.validateReview = (req, res, next) => {
    const result = reviewSchema.validate(req.body);
    console.log(result)
    const error = result.error
    if(result.error){
        const msg = error.details.map(el => el.message).join(",")
        throw new expressError(msg, 400)
    }
    else{
        next()
    }
}

module.exports.isReviewAuthor = async(req, res, next) => {
    const {reviewId} = req.params;
    let review = await Review.findById(reviewId)
    console.log(review.author ,req.user.id)
    if(!(review.author.equals(req.user._id)))
    {
        req.flash("error", "You are not the User")
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}