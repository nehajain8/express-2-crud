const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routers/routes');
// Configuring the database
const dbConfig = require('./models/config.js');
const mongoose = require('mongoose');

//Create express app
const app = express();

//EJS template to use.
app.set('views','./views');
app.set('view engine','ejs');

//Parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))

//Parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json())

//To use static files
app.use('/static',express.static('resources'));

//Connecting to database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
.then(()=>{
    console.log("Successfully connected to the database"); 
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

//Handle routes
// define a simple route
app.get('/', (req, res) => {
    res.render('Notes.ejs'); 
});
//handle request
app.get('/search', (req, res) => {
    res.render('findnote.ejs'); 
});
app.get('/update', (req, res) => {
    //var message= null; 
    res.render('update.ejs',{message:null}); 
});
app.get('/delete', (req, res) => {
    res.render('delete.ejs'); 
});
app.use('/', routes);

//listen for requests
app.listen(3000,() => {
    console.log('Server is listening to port 3000');
});