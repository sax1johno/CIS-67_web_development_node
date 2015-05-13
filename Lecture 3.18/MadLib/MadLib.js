var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// var request = request('request');

app.use(bodyParser());

// app.use(function(req, res, next) {
//     if (req.method == "post") {
//         // parse form body.
//         // add it to req.params
//     }
//     next();
// });



app.get("/", function(request, response) {
    response.render("form.ejs", {});
});

app.post("/story", function(request, response) {
    var noun1 = request.param("noun1");
    var adjective1 = request.param("adjective1");
    var noun2 = request.param("noun2");
    response.render("story.ejs", {
        "noun1": noun1,
        "adjective1": adjective1,
        "noun2": noun2
    });
});

app.listen(process.env.PORT);