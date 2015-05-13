var express = require('express'),
    entryApp = express(),
    middleware = require('../middleware/middleware'),
    redirectIfLoggedIn = middleware.redirectIfLoggedIn,
    sessionAuthMiddleware = middleware.sessionAuthMiddleware,
    JsonDB = require('node-json-db');

var db = new JsonDB("entries", true, true);

entryApp.get('/', redirectIfLoggedIn, function(req, res) {
    var entries = db.getData('/');
    res.render("index.ejs", {
        entries: entries,
        error: req.flash("error"),
        info: req.flash("info"),
        success: req.flash("success")
    });
});


entryApp.get('/admin', sessionAuthMiddleware, function(req, res) {
    var entries = db.getData('/');
    res.render("admin.ejs", {
        entries: entries,
        username: req.session.user.firstName,
        error: req.flash("error"),
        info: req.flash("info"),
        success: req.flash("success")
    });
});

entryApp.get('/admin/entries/create', sessionAuthMiddleware, function(req, res) {
    res.render("entry_create.ejs", {
        error: req.flash("error"),
        info: req.flash("info"),
        success: req.flash("success")
    });
});

entryApp.post('/admin/entries/create', sessionAuthMiddleware, function(req, res) {
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
   // db.push("/f", entry);
    res.redirect('/admin');
});

entryApp.get('/admin/entries/update/:id', sessionAuthMiddleware, function(req, res) {
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

entryApp.post('/admin/entries/update/:id', sessionAuthMiddleware, function(req, res) {
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

entryApp.get('/admin/entries/:id', sessionAuthMiddleware, function(req, res) {
    var thisEntryId = req.param('id');
    var thisEntry = db.getData('/' + thisEntryId);
    res.render("entry_show.ejs", {
        entry: thisEntry,
        error: req.flash("error"),
        info: req.flash("info"),
        success: req.flash("success")
    });
});

entryApp.del('/admin/entries/:id', sessionAuthMiddleware, function(req, res) {
    var id = req.param('id');
    // delete entries[id];
    res.redirect('/admin');
});

entryApp.get('/admin/entries/delete/:id', sessionAuthMiddleware, function(req, res) {
    var id = req.param('id');
    // delete entries[id];
    res.redirect('/admin');
});

module.exports = entryApp;