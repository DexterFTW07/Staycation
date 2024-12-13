const Listing = require("../models/listing");
const Review = require("../models/reviews.js");

module.exports.addReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.reviews);
    newReview.author = req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();

    req.flash("success", "Review Submitted")
    res.redirect(`/listings/${listing._id}`)
}

module.exports.deleteReview = async (req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId} })
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Reviews Deleted!!!")
    res.redirect(`/listings/${id}`)
}