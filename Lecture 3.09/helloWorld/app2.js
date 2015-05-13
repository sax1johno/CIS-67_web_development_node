var express = require('express'); // Returns a function

var app = express();

app.get('/', function(request, response) {
    var name = request.param('name');
    // response.send('<html><body><h1>' + name + ' needs to win the lottery!</h1></body></html>');
    response.render('helloWorld.ejs', 
        {
            "myName": name 
        }
    );
});

app.get('/test', function(request, response) {
    response.send('Test success');
});

app.listen(process.env.PORT);