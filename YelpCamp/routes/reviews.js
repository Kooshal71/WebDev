const express = require("express")
const router = express.Router({mergeParams:true})
const catchAsync = require("../utils/wrapAsync")
const expressError = require("../utils/expressError")
const Campground = require("../models/campground")
const Schema = require("../schemas")
const reviewSchema = Schema.reviewSchema
const Review = require("../models/review")

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


router.delete("/:reviewId", catchAsync( async(req, res) => {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(req.params.reviewId)
    res.redirect(`/campgrounds/${id}`)
    // res.send("This will delete")
}))

router.post("/", validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash("success", "The review has been posted")
    res.redirect(`/campgrounds/${campground.id}`)
}))

module.exports = router