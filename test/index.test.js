var chai = require('chai');
var expect = chai.expect;

var request = require('supertest');
var express = require('express');

var app = express();

var routes = require('../routes/index.js');

app.use('/', routes);

describe('GET /actions', function(){
  it('should respond with correct json addition result', function(done){
    request(app)
      .get('/addition/3/2')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        expect(res.body.result).to.equal(5);
        done();
      });
  })

  it('should respond with correct json subtraction result', function(done){
    request(app)
      .get('/subtraction/3/2')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        expect(res.body.result).to.equal(1);
        done();
      });
  })

  it('should respond with correct json multiplication result', function(done){
    request(app)
      .get('/multiplication/3/2')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        expect(res.body.result).to.equal(6);
        done();
      });
  })

  it('should respond with correct json division result', function(done){
    request(app)
      .get('/division/3/2')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        expect(res.body.result).to.equal('1.50');
        done();
      });
  })

});
