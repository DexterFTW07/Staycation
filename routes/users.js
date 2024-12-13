const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/users.js")

router.route("/signup")
.get(userController.signup)
.post(wrapAsync(userController.signupUser))

router.route("/login")
.get(userController.login)
.post(
    saveRedirectUrl,
    passport.authenticate("local", 
    { failureRedirect: "/login", 
      failureFlash: true }),
     userController.loginUser)

router.get("/logout", userController.logout)

module.exports = router