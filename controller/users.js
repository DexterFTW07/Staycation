const User = require("../models/users.js");

module.exports.signup = (req, res) => {
    res.render("user/signup.ejs")
}

module.exports.signupUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({
            email,
            username
        })
        const regUser = await User.register(newUser, password);
        req.login(regUser , (err) => {
            if(err){
                return next(err)
            }
            req.flash("success", `Welcome ${username} to Staycation`)
            res.redirect("/listings")
        })
       
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup")
    }
}

module.exports.login = (req, res) => {
    res.render("user/login.ejs")
}

module.exports.loginUser = async(req, res)  => {
    req.flash("success", "Welcome back to Staycation");
    const redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
 }

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err){
            next(err)
        }
        req.flash("success", "Your Logged Out Successfully");
        res.redirect("/listings")
    })
}