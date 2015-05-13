var express = require('express');

var app = express();

// var request = request('request');

app.get("/", function(request, response) {
    response.render("form.ejs", {});
});

app.get("/story/:id", function(request, response) {
    var noun1 = request.param("noun1");
    var adjective1 = request.param("adjective1");
    var noun2 = request.param("noun2");
    var id = request.param("id");
    response.render("story.ejs", {
        "noun1": noun1,
        "adjective1": adjective1,
        "noun2": noun2,
        "id": id
    });
});

// app.get("/article/:year/:month/:day/:slug", 
//     function(req, res) {
//   var year = req.param('year');
//   var month = req.param('month');
   
// });

app.listen(process.env.PORT);