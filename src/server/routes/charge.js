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

router.post('/stripe', function(req, res, next) {
  console.log(req.body);
  // Obtain StripeToken
  var stripeToken = req.body.stripeToken;
  var receiptEmail = req.body.email;
  // Simple validation
  stripe.charges.create({
    amount: 500,
    currency: "usd",
    source: stripeToken, // obtained with Stripe.js
    description: "Priorities - EP",
    receipt_email: receiptEmail
  }, function(err, charge) {
    if(err) {
      return next(err);
    } else {
      req.flash('success', 'Thanks for purchasing the Priorities - EP!');
      res.redirect('/success');
    }
  });
});

module.exports = router;