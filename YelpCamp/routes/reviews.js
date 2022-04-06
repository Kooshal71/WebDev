const express = require("express")
const router = express.Router({mergeParams:true})
const catchAsync = require("../utils/wrapAsync")
const isLoggedIn = require("../middleware")
const isReviewAuthor = require("../middleware")
const {validateReview} = require("../middleware")
const reviews = require("../controllers/reviews")


router.delete("/:reviewId",isLoggedIn, isReviewAuthor, catchAsync(reviews.delete))
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.create))

module.exports = router