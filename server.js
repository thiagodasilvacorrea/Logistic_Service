
// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var dbconfig  = require('./dbconfig');
var mysql = require ('mysql');
var myConnection = require('express-myconnection');
var session  = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var passportAutentication = require('./app/passportAutentication.js');

// Express configuration

  passportAutentication(passport,app);  // enviar passaport para configuração das estrategias de autenticação.

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(myConnection(mysql,dbconfig,'request'));
app.use(cookieParser()); // Ler os cookies(necessario para autenticação).

//Requisito para passport
app.use(session({
	secret: 'thiagoscorrearunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


app.use(express.static('public'));

/*//welcome
app.get('/', function(req, res) {
    res.redirect('./index.html');
});
*/

// Api/entrega
app.use('/api', require('./routes/index.js'));

//Api/Autentication
require('./routes/autentication.js')(passport,app);

app.use(function(req, res, next) {
    req.app = app;
    req.passport = passport;
    next();
});

var server = app.listen(3000, function() {
    console.log("Server running at http://localhost:3000");
});