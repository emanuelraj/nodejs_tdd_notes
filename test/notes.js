process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Note = require('../app/models/note');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../main');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Notes', () => {
    beforeEach((done) => { //Before each test we empty the database
        Note.remove({}, (err) => { 
           done();         
        });     
    });

/*
* Test the /GET route
*/
  describe('/GET note', () => {
      it('it should GET all the notes', (done) => {
        chai.request(server)
            .get('/note')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});
