var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

router.get('/photos', function(req, res, next) {
  res.render('photos', {title: "Mike's Photos", user: req.user});
});

router.get('/followMe', function(req, res, next) {
  res.render('followMe', {user: req.user});
});

router.get('/magazine', function(req, res, next) {
  res.render('magazine', {user: req.user});
});

router.get('/success', function(req, res, next) {
  res.render('success', {user: req.user});
});

module.exports = router;