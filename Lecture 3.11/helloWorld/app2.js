var express = require('express'); // Returns a function

var app = express();

app.get('/', function(request, response) {
    var name = request.param('name');
    var age = request.param('age');
    var token = request.param('token');
    var iq = request.param('iq');
    var price = request.param('price');
    // response.send('<html><body><h1>' + name + ' needs to win the lottery!</h1></body></html>');
    response.render('helloWorld.ejs', 
        {
            "myName": name,
            "myAge": age,
            "myToken": token,
            "myIq": iq,
            "myPrice": price
        }
    );
});

app.get('/login', function(request, response) {
    console.log("called get method");
    var name = request.param('name');
    var password = request.param('password');
    var price = request.param('price');
    var date = request.param('date');
    response.render('login.ejs', {
        "name": "",
        "password": "",
        "price": "",
        "date": ""
    });
});

app.post('/login', function(request, response) {
    var name = request.param('name');
    var password = request.param('password');
    var price = request.param('price');
    var date = request.param('date');
    response.render('login.ejs', {
        "name": name,
        "password": password,
        "price": price,
        "date": date
    });
});

app.listen(process.env.PORT);