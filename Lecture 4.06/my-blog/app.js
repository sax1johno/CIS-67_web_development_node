var express = require('express'),
    session = require('express-session'),
    cookieparser = require('cookie-parser'),
    bodyparser = require('body-parser'),
    crypto = require('crypto'),
    flash = require('connect-flash'),
    // entries = require('./entries'),
    users = require('./users'),
    sutil = require('util'),
    JsonDB = require('node-json-db');
    
var app = express();
var db = new JsonDB("entries", true, true);

app.use(session({
    secret: "asdfasdfasdf"
}));
app.use(cookieparser('oiwnevlijas923q0w8u'));
app.use(bodyparser());
app.use(flash());

var sessionAuthMiddleware = function (req, res, next) {
    if (!req.session.user) {
        req.flash("error", "Need to be logged in to access");
        res.redirect('/login');
    } else {
        next();
    }
}

var redirectIfLoggedIn = function(req, res, next) {
    if (!req.session.user) {
        next();
    } else {
        res.redirect("/admin");
    }
}

app.get("/logout", sessionAuthMiddleware, function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});

app.get('/', redirectIfLoggedIn, function(req, res) {
    var entries = db.getData('/');
    res.render("index.ejs", {
        entries: entries,
        error: req.flash("error"),
        info: req.flash("info"),
        success: req.flash("success")
    });
});

app.get('/login', redirectIfLoggedIn, function(req, res) {
    res.render("login.ejs", {
        error: req.flash("error"),
        info: req.flash("info"),
        success: req.flash("success")
    });
});

app.post('/login', redirectIfLoggedIn, function(req, res) {
    var username = req.param('username');
    var password = req.param('password');
    if (users.hasOwnProperty(username)) {
        if (password !== users[username]) {
            req.flash("error", "Invalid username or password");
            res.render("login.ejs", {
                error: req.flash("error"),
                info: req.flash("info"),
                success: req.flash("success")
            });
        } else {
            req.session.user = username;
            req.flash("success", "You've successfully logged in.");
            res.redirect('/admin');
            sutil.inspect(req);
        }
    } else {
        req.flash("error", "Invalid username or password");
        res.render("login.ejs", {
            error: req.flash("error"),
            info: req.flash("info"),
            success: req.flash("success")
        });
    }
})

app.get('/admin', sessionAuthMiddleware, function(req, res) {
    var entries = db.getData('/');
    res.render("admin.ejs", {
        entries: entries,
        username: req.session.user,
        error: req.flash("error"),
        info: req.flash("info"),
        success: req.flash("success")
    });
});

app.get('/admin/entries/create', sessionAuthMiddleware, function(req, res) {
    res.render("entry_create.ejs", {
        error: req.flash("error"),
        info: req.flash("info"),
        success: req.flash("success")
    });
})

app.post('/admin/entries/create', sessionAuthMiddleware, function(req, res) {
   var title = req.param('title');
   var date = req.param('date');
   var slug = req.param('slug');
   var text = req.param('text');
   var id = req.param('id');
   var entry = {
       "title": title,
       "date": date,
       "slug": slug,
       "text": text
   }
   db.push("/" + id, entry);
   
    res.redirect('/admin');
});

app.get('/admin/entries/update/:id', sessionAuthMiddleware, function(req, res) {
    var thisEntryId = req.param('id');
    var thisEntry = db.getData("/" + thisEntryId);
    res.render('entry_update.ejs', {
        "id": thisEntryId,
        "entry": thisEntry,
        error: req.flash("error"),
        info: req.flash("info"),
        success: req.flash("success")
    });
});

app.post('/admin/entries/update/:id', sessionAuthMiddleware, function(req, res) {
    var title = req.param('title');
    var date = req.param('date');
    var slug = req.param('slug');
    var text = req.param('text');
    var id = req.param('id');
    var entry = {
       "title": title,
       "date": date,
       "slug": slug,
       "text": text
    };
   db.push("/" + id, entry);
    res.redirect('/admin');
});

app.get('/admin/entries/:id', sessionAuthMiddleware, function(req, res) {
    var thisEntryId = req.param('id');
    var thisEntry = db.getData('/' + thisEntryId);
    res.render("entry_show.ejs", {
        entry: thisEntry,
        error: req.flash("error"),
        info: req.flash("info"),
        success: req.flash("success")
    });
});

app.del('/admin/entries/:id', sessionAuthMiddleware, function(req, res) {
    var id = req.param('id');
    // delete entries[id];
    res.redirect('/admin');
});

app.get('/admin/entries/delete/:id', sessionAuthMiddleware, function(req, res) {
    var id = req.param('id');
    // delete entries[id];
    res.redirect('/admin');
});


app.listen(process.env.PORT);