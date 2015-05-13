var express = require('express'),
    session = require('express-session'),
    cookieparser = require('cookie-parser'),
    bodyparser = require('body-parser'),
    crypto = require('crypto'),
    flash = require('connect-flash'),
    // entries = require('./entries'),
    // users = require('./users'),
    sutil = require('util'),
    JsonDB = require('node-json-db'),
    middleware = require('./middleware/middleware'),
    sessionAuthMiddleware = middleware.sessionAuthMiddleware,
    redirectIfLoggedIn = middleware.redirectIfLoggedIn,
    userApp = require('./controllers/user'),
    entryApp = require('./controllers/entry');
    
var app = express();
// var app2 = express();

app.use(session({
    secret: "asdfasdfasdf"
}));
app.use(cookieparser('oiwnevlijas923q0w8u'));
app.use(bodyparser());
app.use(flash());

// This loads up all the different components of my application.
app.use(userApp);
app.use(entryApp);
// app.use(imageGalleryApp);

app.listen(process.env.PORT);