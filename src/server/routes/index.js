var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', {title: 'req.user'});
});

router.get('/ping', function(req, res, next) {
  res.send("pong!");
});

router.get('/photos', function(req, res, next) {
  res.render('photos', {title: "Mike's Photos"});
});

module.exports = router;