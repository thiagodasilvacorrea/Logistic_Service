
// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var dbconfig  = require('./dbconfig');
var mysql = require ('mysql');
var myConnection = require('express-myconnection');


// Express configuration

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(myConnection(mysql,dbconfig,'single'));



/*//welcome
app.get('/', function(req, res) {
    res.redirect('./index.html');
});
*/
// Api
app.use('/api', require('./routes/index.js'));


app.use(function(req, res, next) {
    req.app = app;
    next();
});

var server = app.listen(3000, function() {
    console.log("Server running at http://localhost:3000");
});