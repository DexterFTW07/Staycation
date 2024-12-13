const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const baseClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    let { search } = req.query;
    console.log("Search Query:", search);
    let allListings;
    if(search){
         allListings = await Listing.find({
            location: {$regex: search, $options: "i"}
        });
    } else {
         allListings = await Listing.find({})
    }

    res.render("listings/index.ejs", { allListings, search })
}


module.exports.postNew = async (req, res) => {

    let response = await baseClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
        .send();

    let url = req.file.path;
    let fileName = req.file.filename
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, fileName };
    newListing.geometry = response.body.features[0].geometry
    let savedListing = await newListing.save();
    console.log(savedListing)
    req.flash("success", "New Listing Created!!!")
    res.redirect("/listings")
}

module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "review",
            populate: {
                path: "author"
            },
        })
        .populate('owner');
    if (!listing) {
        req.flash("error", "Listing does not exist");
        res.redirect("/listings")
    }
    res.render("listings/show.ejs", { listing })
}

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    const imageUrl = listing.image.url;
    let orignalImgUrl = imageUrl.replace("/upload", "/upload/w_250")
    if (!listing) {
        req.flash("error", "Listing does not exist");
        res.redirect("/listings")
    }
    res.render("listings/edit.ejs", { listing, orignalImgUrl })
}


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let fileName = req.file.filename;
        listing.image = { url, fileName };
        await listing.save();
    }

    req.flash("success", "Successfully Edited");
    res.redirect(`/listings/${id}`)
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!!!")
    res.redirect("/listings")
}