var express = require('express');
var router = express.Router();
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
var User = require('../models/user.js');
var Product = require('../models/product.js');


router.get('/products', function(req, res, next){
  return Product.find({}, function(err, data) {
    if (err) {
      return next(err);
    } else {
      return res.render('products', {products: data, user: req.user, product1: data[0]});
    }
  });
});

router.get('/product/:id', function(req, res, next) {
  var productID = req.params.id;
  Product.findById(productID, function(err, data) {
    if(err) {
      return next(err);
    } else {
      return res.render('product', {product: data, user: req.user});
    }
  });
});

router.get('/charge/:id', ensureAuthenticated, function(req, res, next) {
  var productID = req.params.id;
  return Product.findById(productID, function(err, data) {
    if (err) {
      return next(err);
    } else {
      return res.render('charge', {product: data, user: req.user});
    }
  });
});

router.get('/stripe', function(req, res, next) {
  res.send("Scram!");
});


router.post('/stripe', ensureAuthenticated, function(req, res, next) {
  console.log(req.body);
  // Obtain StripeToken
  var stripeToken = req.body.stripeToken;
  var userID = req.user._id;
  // Simple validation
  User.findById(userID, function(err, user) {
    if (err) {
      return next(err);
    } else {
      
        stripe.charges.create({
          amount: 500,
          currency: "usd",
          source: stripeToken, // obtained with Stripe.js
          description: "Priorities - EP",
          receipt_email: user.email
        }, function(err, charge) {
          if(err) {
            return next(err);
          } else {
            req.flash('success', 'Thanks for purchasing the Priorities - EP!');
            res.redirect('auth/profile');
          }
        });
    }
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.flash('success', 'You must be signed in to view this page!');
  res.redirect('/auth/login');
}


module.exports = router;