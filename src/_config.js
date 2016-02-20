var config = {};

// mongo uri
config.mongoURI = {
  development: "mongodb://localhost/node-stripe-charge",
  test: "mongodb://localhost/node-stripe-charge-test",
  production: process.env.MONGOLAB_URI
};

module.exports = config;