var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var crypto = require('crypto');

// npm install express body-parser cookie-parser express-session crypto ejs

function hashPassword(password) {
    return crypto
            .createHash('sha256')
            .update(password)
            .digest('base64')
            .toString();
}

function validateUser(username, password) {
    switch (username) {
        case 'john':
            if (password == "test") {
                return true;
            } else {
                return false;
            }
            break;
        case 'bob':
            return false;
            break;
        default:
            return false;
    }    
};

var app = express();

app.use(bodyParser());
app.use(cookieParser('oiwnevlijas923q0w8u'));
app.use(session());


var authMiddleware = function(req, res, next) {
    if (!req.session.user) {
        req.session.message = "You need to log in first";
        res.redirect('/login');
    } else {
        next();
    }
};

// req.session
// {
//     message: "whatever",
//     cookie: {},
//     flash: {
//         message: "Hey dummy",
//         count: 1
//     }
// }

// req.session.flash = {};
// req.session.flash.message = "Hi there";

// var flashMiddleware = function(req, res, next) {
//     if (req.session.flash) {
//         if (req.session.flash.count > 1) {
//             delete req.session.flash;
//         } else {
//             req.session.flash.count++;
//         }
//     }
//     next();
// }

app.get('/', 
    flashMiddleware,
    function(req, res) {
    res.render("index.ejs", {
        message: req.session.flash.message
    });
});

app.get('/restricted', authMiddleware, flashMiddleware, function(req, res) {
    // if (req.session.user) {
    res.render('restricted.ejs', {
        message: req.session.flash.message
    });
    // } else {
    //     req.session.message = "You need to log in first";
    //     res.redirect('/login');
    // }
});

app.post('/login', flashMiddleware, function(req, res) {
    var username = req.param('username');
    var password = req.param('password');
    if (!validateUser(username, password)) {
        req.session.flash.message = "Invalid username OR password";
        res.render('login.ejs', {
            message: req.session.flash.message
        });
    } else {
        req.session.user = username;
        req.session.flash.message = "You've logged in successfully";
        res.redirect('/restricted');
    }
});

app.get('/login', function(req, res) {
    if (req.session.user) {
        req.session.flash.message = "Hey dummy - you're already logged in";
        res.redirect('/restricted');   
    } else {
        res.render('login.ejs', {
            message: req.session.message
        });
        //res.send("<h2>This is the login page</h2>");
        // res.render("<form><input type='text'/><input type='password')
    }
});

app.get('/logout', function(req, res) {
    req.session.user = null;
    req.session.flash.message = "You've been successfully logged out";
    res.redirect('/login');
});

app.listen(process.env.PORT);