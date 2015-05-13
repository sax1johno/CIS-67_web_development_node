/** 
 * The purpose of this application is to demonstrate how to
 * connect to an API using a node.js library called
 * "unirest".  This connects to another server using your
 * node.js application and allows us to retreive and
 * re-display data.
 **/
 
var express = require('express'),
    app = express(),
    unirest = require('unirest'),
    querystring = require('querystring');

/**
 * Retrieve the home page of google.com and
 * display it to the user.
 **/
app.get('/google', function(req, res, next) {
     unirest.get('http://www.google.com')
        .end(function(response) {
            res.send(response.body);
        });
});

/** 
 * A slightly more complicated example:
 * Reach out to the NASA Soda API and use the astronomy
 * picture of the day API to get Nasa's current astronomy
 * picture of the day
 **/
app.get('/apod', function(req, res, next) {
    var API_ENDPOINT = "https://api.data.gov/nasa/planetary/apod";
    var parameters = {
        "api_key": "RCxj0hENMHTlgdK6Q83Q0W3HH15TiJMogvHotbe9",
        "concept_tags": true,
        // "date": req.param('date')
    };
    if (req.param('date')) {
        parameters['date'] = req.param('date');
    }
    var qs = querystring.stringify(parameters);
    // console.log(qs);
    var url = API_ENDPOINT + "?" + qs;
    console.log("url = ", url);
    unirest.get(url)
           .end(function(response) {
              console.log(response);
              if (response.code != 200) {
                  res.send(response);
              } else {
                var pictureUrl = response.body.url;
                var title = response.body.title;
                var explanation = response.body.explanation;
                var tags = response.body.concept_tags;
                res.render('apod.ejs', {
                    url: pictureUrl,
                    title: title,
                    explanation: explanation
                });
              }
    });
});

app.listen(process.env.PORT);