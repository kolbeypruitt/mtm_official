var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Product = new Schema({
  name: String,
  amount: Number,
  currency: {
    type: String,
    default: 'USD'
  },
  forSale: {
    type: Boolean,
    default: true
  },
  prod_id: {
    type: String
  }
});

module.exports = mongoose.model('products', Product);