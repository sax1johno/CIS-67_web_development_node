var express = require('express'),
    session = require('express-session'),
    cookieparser = require('cookie-parser'),
    bodyparser = require('body-parser'),
    crypto = require('crypto'),
    flash = require('connect-flash'),
    entries = require('./entries');
    
var app = express();

app.use(session({
    secret: "asdfasdfasdf"
}));
app.use(cookieparser('oiwnevlijas923q0w8u'));
app.use(bodyparser());
app.use(flash());

app.get('/', function(req, res) {
    res.render("index.ejs", {
        entries: entries
    });
});

app.get('/admin', function(req, res) {
    res.render("admin.ejs", {
        entries: entries
    });
});

app.get('/admin/entries/create', function(req, res) {
    res.render("entry_create.ejs", {
    });
})

app.post('/admin/entries/create', function(req, res) {
   var title = req.param('title');
   var date = req.param('date');
   var slug = req.param('slug');
   var text = req.param('text');
   var id = req.param('id');
   entries[id] = {
       "title": title,
       "date": date,
       "slug": slug,
       "text": text
   }
    res.redirect('/admin');
});

app.get('/admin/entries/update/:id', function(req, res) {
    var thisEntryId = req.param('id');
    var thisEntry = entries[thisEntryId];
    res.render('entry_update.ejs', {
        "id": thisEntryId,
        "entry": thisEntry
    });
});

app.post('/admin/entries/update/:id', function(req, res) {
    var title = req.param('title');
    var date = req.param('date');
    var slug = req.param('slug');
    var text = req.param('text');
    var id = req.param('id');
    entries[id] = {
       "title": title,
       "date": date,
       "slug": slug,
       "text": text
    };
    res.redirect('/admin');
});

app.get('/admin/entries/:id', function(req, res) {
    var thisEntryId = req.param('id');
    res.render("entry_show.ejs", {
        entry: entries[thisEntryId]
    });
});

app.del('/admin/entries/:id', function(req, res) {
    var id = req.param('id');
    delete entries[id];
    res.redirect('/admin');
});

app.get('/admin/entries/delete/:id', function(req, res) {
    var id = req.param('id');
    delete entries[id];
    res.redirect('/admin');
});


app.listen(process.env.PORT);