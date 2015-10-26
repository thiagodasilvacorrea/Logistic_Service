// Dependencias 

var express = require('express');
var apiRouter = express.Router()
var api = require ('../app/logisticProvider.js');

// Rota para retornar dos dados 
apiRouter.route('/entrega')
.get(api.retriave);


module.exports = apiRouter;