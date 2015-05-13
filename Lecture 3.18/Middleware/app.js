var express = require('express');

var app = express();

app.use(express.static("./public"));

// app.use(express.bodyParser());
// app.use(express.cookieParser());

// app.use(
//     express.static(
//         __dirname + '/public'
//     )
// );

app.use(function(request, response, next) {
    var stop = request.param('stop');
    if (stop) {
        response.send({"Unable to process": "Stop command received"});
    } else {
        next();
    }
});

app.get('/', function(req, res) {
    res.render('index.ejs', {
        "title": "Please donate bitcoin" 
    });
});

app.get('/story', function(req, res, next) {
        // res.send({"Here is some data": "More will follow"});
        next();
    },
    function(req, res, next) {
    if (!req.param('authorized')) {
        res.send({
            "Unable to process": "User not authorized"
        });
    } else {
        next();
    }
}, function(req, res) {
    res.render('index.ejs', {
        "title": req.param('title')
    });
});

// app.get('/css/:fileName', function(req, res) {
    
// });

app.listen(process.env.PORT);