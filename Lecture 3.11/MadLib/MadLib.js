var express = require('express');

var app = express();

app.get('/form', function(req, res) {
    // Render the form in which the user enters madlib stuff.
    res.render('form.ejs', {
        
    });
});

app.get('/story', function(req, res) {
    /**
     * Get each of the variables from the form.
     **/
     res.render('story.ejs', {
         
     });
});

app.listen(process.env.PORT);