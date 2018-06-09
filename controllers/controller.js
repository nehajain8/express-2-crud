const Note= require('../models/model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    var noteID = req.body.noteid;   
    var noteTitle = req.body.title;
    var noteContent=req.body.content;

   
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });

    }
    // Create a Note
    const note = new Note({
        noteid: req.body.noteid,
        title: req.body.title || "Untitled Note", 
        content: req.body.content

    });
    note.save()
    .then(data => {
        res.render('notedetail',{data,message:"Note created successfully"});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    var note_id= req.body.findnoteid;
    Note.findOne({noteid:note_id},function(err,data){
        if(data){
            res.render('searchresult',{data,message:"Note found"}); 
        }else{
            res.render('searchresult',{data,message:"Note not found"}); 
        }
    }) 
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  
    var note_id= req.body.noteid;
    Note.updateOne({noteid:note_id } , {$set:{title: req.body.title,content: req.body.content}} ,   
    function(err,note) {  
        if (err) {  
            res.send(err);  
            return;  
        }  
        res.render('updateresult',{message: "Note updated successfully!"});
    });  
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    var findnoteid=req.body.findnoteid; 
    Note.remove({noteid:findnoteid})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + findnoteid
            });
        }
        res.render('deleteresult',{message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + findnoteid
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + findnoteid
        });
    });
};