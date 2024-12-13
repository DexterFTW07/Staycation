const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing");
const { validateReviews, isLoggedIn, isReviewAuthor } = require("../middleware.js")
const reviewController = require("../controller/reviews.js")

//Add Reviws Route
router.post("/", validateReviews, isLoggedIn, wrapAsync(reviewController.addReview))

//Delete Reviws Route
router.delete("/:reviewId", isReviewAuthor, wrapAsync(reviewController.deleteReview))

module.exports = router
