var express = require('express'),
    session = require('express-session'),
    cookieparser = require('cookie-parser'),
    bodyparser = require('body-parser'),
    crypto = require('crypto'),
    flash = require('connect-flash'),
    posts = require('./posts');
    
var app = express();

app.use(session({
    secret: "asdfasdfasdf"
}));
app.use(cookieparser('oiwnevlijas923q0w8u'));
app.use(bodyparser());
app.use(flash());

app.get('/', function(req, res) {
    res.render("index.ejs", {
        posts: posts
    })
});

app.get('/api', function(req, res) {
    res.send(posts);
});

app.listen(process.env.PORT);