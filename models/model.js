const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    noteid     : { type : String , unique : true, required : true },
    title: String,
    content: String
},{
    timestamps: true
});

module.exports = mongoose.model('Note',NoteSchema);