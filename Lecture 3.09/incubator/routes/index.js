var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    req.param('variableName');
  res.render('index', { title: 'Express' });
});

module.exports = router;
