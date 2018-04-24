let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//notes schema definition
let NotesSchema = new Schema(
  {
    todo: { type: String, required: true },
	completed: { type:Boolean, default: false },
    createdAt: { type: Date, default: Date.now },    
  }, 
  { 
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
NotesSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the BookSchema for use elsewhere.
module.exports = mongoose.model('note', NotesSchema);
