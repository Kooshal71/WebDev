const Campground = require("../models/campground")
const Review = require("../models/review")


module.exports.create = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body)
    review.author = req.user.id
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash("success", "The review has been posted")
    res.redirect(`/campgrounds/${campground.id}`)
}

module.exports.delete =  async(req, res) => {
    const {id, reviewId} = req.params
    await Campground.findByIdAndUpdate(id, {$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(req.params.reviewId)
    res.redirect(`/campgrounds/${id}`)
    // res.send("This will delete")
}