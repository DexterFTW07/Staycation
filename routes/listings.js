const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const Listing = require("../models/listing");
const listingController = require("../controller/listing.js")
const multer  = require("multer");
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage })

// All Listings Route

router.route("/")
.get( wrapAsync (listingController.index))
.post(isLoggedIn, upload.single("listing[image]"), wrapAsync (listingController.postNew));

// New Listing Route
router.get("/new", isLoggedIn, wrapAsync(async (req, res) => {
    res.render("listings/new.ejs")
})
);



router.route("/:id")
.get( wrapAsync (listingController.showListings))
.put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync (listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync (listingController.deleteListing));

// Edit Listing Route

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync (listingController.editListing)
);

module.exports = router