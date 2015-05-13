var thisIsPrivate = function() {
    console.log("You'll never see this outside of middleware.js");
}

module.exports.sessionAuthMiddleware = function (req, res, next) {
    if (!req.session.user) {
        req.flash("error", "Need to be logged in to access");
        res.redirect('/login');
    } else {
        next();
    }
}

module.exports.redirectIfLoggedIn = function(req, res, next) {
    if (!req.session.user) {
        next();
    } else {
        res.redirect("/admin");
    }
}