var express = require('express'),
    app = express();
    
app.get('/appointments', function(req, res) {
    // Retrieve for appointments data model    
});

app.post('/appointments', function(req, res) {
    // Update appointments
});

app.post('/appointments/create', function(req, res) {
   // Create new appointments 
});

app.post('/appointments/delete/:id', function(req, res) {
   // delete appointments 
});

module.exports = app;