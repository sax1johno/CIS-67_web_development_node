var express = require("express"),
    userApp = express(),
    middleware = require('../middleware/middleware'),
    redirectIfLoggedIn = middleware.redirectIfLoggedIn,
    sessionAuthMiddleware = middleware.sessionAuthMiddleware,
    sutil = require('util'),
    JsonDB = require('node-json-db');

var userDB = new JsonDB("./users", true, true);
    
userApp.get('/login', redirectIfLoggedIn, function(req, res) {
    res.render("login.ejs", {
        error: req.flash("error"),
        info: req.flash("info"),
        success: req.flash("success")
    });
});

userApp.post('/login', redirectIfLoggedIn, function(req, res) {
    var username = req.param('username');
    var password = req.param('password');
    try {
        var thisUser = userDB.getData('/' + username);
        sutil.inspect(thisUser);
        
        if (password !== thisUser.password) {
            req.flash("error", "Invalid username or password");
            res.render("login.ejs", {
                error: req.flash("error"),
                info: req.flash("info"),
                success: req.flash("success")
            });
        } else {
            req.session.user = thisUser;
            req.flash("success", "You've successfully logged in.");
            res.redirect('/admin');
            sutil.inspect(req);
        }
    } catch (e) {
        req.flash("error", "Invalid username or password");
        res.render("login.ejs", {
            error: req.flash("error"),
            info: req.flash("info"),
            success: req.flash("success")
        });
    }
})

userApp.get("/logout", sessionAuthMiddleware, function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});


module.exports = userApp;