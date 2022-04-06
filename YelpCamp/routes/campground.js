const express = require("express")
const router = express.Router()
const catchAsync = require("../utils/wrapAsync")
const isLoggedIn = require("../middleware")
const{isAuthor, validateCampground} = require("../middleware")
const campgrounds = require("../controllers/campground")

router.route("/")
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, validateCampground,catchAsync(campgrounds.postCreate))

router.get("/new", isLoggedIn, campgrounds.create)

router.route("/:id")
    .get(catchAsync(campgrounds.find))
    .put(isLoggedIn ,isAuthor ,catchAsync (campgrounds.postEdit))
    .delete(isLoggedIn ,isAuthor , catchAsync(campgrounds.delete))

router.post("/campgrounds/:id/reviews", isLoggedIn, catchAsync(campgrounds.postReview))
router.get("/:id/edit" ,isLoggedIn ,isAuthor ,catchAsync(campgrounds.edit))

module.exports = router