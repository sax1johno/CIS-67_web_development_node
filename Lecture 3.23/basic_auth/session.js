var express = require('express');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var basicAuth = require('basic-auth-connect');

var app = express();

app.use(cookieParser());
app.use(cookieSession(
    {
        secret: "w1ww3q1313383438314848fe4gsd!@#$"
    }
));

var auth = basicAuth(function(user, password) {
    console.log("username = ", user, " and password = ", password);   
    
    if (user == "john" && password == "asdf") {
        return true;
    } else if (user == "admin") {
        return true;
    }
    else {
        return false;
    }
});

app.get('/', function(req, res) {
    console.log(req.cookies);
    if (req.session.restricted) {
        // res.send(403);
        res.send("You have been in the restricted section " + req.session.restrictedCount + " times.");
    } else {
        res.send("Welcome to the library");
    }
});

app.get("/loggedin",
    function(req, res, next) {
        var authenticated = basicAuth(function(username, password) {
            return (username == "john" && password == "jkl;");    
        })
        if (authenticated) {
            req.session.loggedIn = true;
        }
        next();
    },
    function(req, res) {
        req.session.restricted = true;
        if (!req.session.restrictedCount) {
            req.session.restrictedCount = 1;
        } else {
            req.session.restrictedCount += 1;
        }
        res.redirect('/');
});

app.get('/restricted', function(req, res, next) {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    } else {
        next();
    }
}, function(req, res) {
    // My app code would now go in here.
    res.send({"Success!": "Successfully logged in"});
});

app.get('/logout', function(req, res, next) {
    req.session.loggedIn = false;
}, function(req, res) {
    res.redirect('/');
})

app.listen(process.env.PORT);