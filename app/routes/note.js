let mongoose = require('mongoose');
let Note = require('../models/note');

/*
 * GET /note route to retrieve all the notes.
 */
function getNotes(req, res) {
    //Query the DB and if no errors, send all the notes
    let query = Note.find({});
    query.exec((err, notes) => {
        if(err) res.send(err);
        //If no errors, send them back to the client
        res.json(notes);
    });
}

/*
 * POST /note to save a new note.
 */
function postNote(req, res) {
    //Creates a new note
    var newNote = new Note(req.body);
    //Save it into the DB.
    newNote.save((err,note) => {
        if(err) {
            res.send(err);
        }
        else { //If no errors, send it back to the client
            res.json({message: "Note successfully added!", note });
        }
    });
}

/*
 * GET /note/:id route to retrieve a note given its id.
 */
function getNote(req, res) {
    Note.findById(req.params.id, (err, note) => {
        if(err) res.send(err);
        //If no errors, send it back to the client
        res.json(note);
    });     
}

/*
 * DELETE /note/:id to delete a note given its id.
 */
function deleteNote(req, res) {
    Note.remove({_id : req.params.id}, (err, result) => {
        res.json({ message: "Book successfully deleted!", result });
    });
}

/*
 * PUT /note/:id to updatea a note given its id
 */
function updateNote(req, res) {
    Note.findById({_id: req.params.id}, (err, note) => {
        if(err) res.send(err);
        Object.assign(note, req.body).save((err, note) => {
            if(err) res.send(err);
            res.json({ message: 'Book updated!', note });
        }); 
    });
}

//export all the functions
module.exports = { getNotes, postNote, getNote, deleteNote, updateNote };