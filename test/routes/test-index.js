process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var app = require('../../src/server/app');
var should = chai.should();

chai.use(chaiHttp);


describe('index.js Routes', function(){

  describe('GET /', function(){
    it('should return a view', function(done){
      chai.request(app)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.html;  // jshint ignore:line
        res.text.should.contain.contain('Singer - Song Writer - Christian');
        done();
      });
    });
  });

  describe('GET /photos', function(){
    it('should return a view', function(done){
      chai.request(app)
      .get('/photos')
      .end(function(err, res){
        res.should.have.status(200);
        res.text.should.contain.contain('<h1>Photos</h1>');
        done();
      });
    });
  });

});