var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());

app.get('/', function(req, res) {
    console.log(req.cookies);
    var count = 0;
    if (req.cookies.hasVisited) {
        if (req.cookies.hasVisited > 30) {
            res.clearCookie();
        }
        count = ++req.cookies.hasVisited;
    }
    res.cookie("hasVisited", count);
    res.send("User has visited " + count + " times");
});

app.listen(process.env.PORT);