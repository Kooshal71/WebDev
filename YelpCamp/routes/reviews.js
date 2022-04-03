const express = require("express")
const router = express.Router({mergeParams:true})
const catchAsync = require("../utils/wrapAsync")
const Campground = require("../models/campground")
const Review = require("../models/review")
const isLoggedIn = require("../middleware")
const isReviewAuthor = require("../middleware")
const {validateReview} = require("../middleware")

router.delete("/:reviewId",isLoggedIn, isReviewAuthor, catchAsync( async(req, res) => {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(req.params.reviewId)
    res.redirect(`/campgrounds/${id}`)
    // res.send("This will delete")
}))

router.post("/", isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body)
    review.author = req.user.id
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash("success", "The review has been posted")
    res.redirect(`/campgrounds/${campground.id}`)
}))

module.exports = router