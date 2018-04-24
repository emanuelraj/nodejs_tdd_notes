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

    /*
    * Test the /POST route
    */
    describe('/POST note', () => {
        it('it should not POST a note without todo field', (done) => {
            let note = {
                completed: false
            }
            chai.request(server)
                .post('/note')
                .send(note)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('todo');
                    res.body.errors.todo.should.have.property('kind').eql('required');
                done();
                });
        });
        it('it should POST a Note ', (done) => {
            let note = {
                todo: "Testing",
                completed: false
            }
            chai.request(server)
                .post('/note')
                .send(note)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Note successfully added!');
                    res.body.note.should.have.property('todo');
                    res.body.note.should.have.property('completed');
                  done();
                });
          });
    });

    /*
    * Test the /GET/:id route
    */
    describe('/GET/:id note', () => {
        it('it should GET a note by the given id', (done) => {
            let note = new Note({ todo: "The Lord of the Rings"});
            note.save((err, note) => {
                chai.request(server)
                .get('/note/' + note.id)
                .send(note)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('todo');
                    res.body.should.have.property('_id').eql(note.id);
                done();
                });
            });

        });
    });

    /*
    * Test the /PUT/:id route
    */
    describe('/PUT/:id note', () => {
        it('it should UPDATE a note given the id', (done) => {
        let note = new Note({todo: "The Chronicles of Narnia"})
        note.save((err, note) => {
                chai.request(server)
                .put('/note/' + note.id)
                .send({todo: "The Chronicles of Narnia", completed: true})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Note updated!');
                    res.body.note.should.have.property('completed').eql(true);
                    done();
                });
            });
        });
    });

    /*
    * Test the /DELETE/:id route
    */
    describe('/DELETE/:id note', () => {
        it('it should DELETE a note given the id', (done) => {
        let note = new Note({todo: "The Chronicles of Narnia"})
        note.save((err, note) => {
                chai.request(server)
                .delete('/note/' + note.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Note successfully deleted!');
                    res.body.result.should.have.property('ok').eql(1);
                    res.body.result.should.have.property('n').eql(1);
                    done();
                });
            });
        });
    });
});
