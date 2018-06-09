const notes = require('../controllers/controller');
const express= require('express');
var routes = express.Router();

// Create a new Note
routes.post('/notes', notes.create);

// Retrieve all Notes
routes.get('/notes', notes.findAll);

// Retrieve a single Note with noteId
routes.post('/search', notes.findOne);

// Update a Note with noteId
routes.post('/update', notes.update);

// Delete a Note with noteId
routes.post('/delete', notes.delete);



module.exports = routes;