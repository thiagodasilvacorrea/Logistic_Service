// Dependencias 

var express = require('express');
var apiRouter = express.Router()
var api = require ('../app/logisticProvider.js');

// Rota para retornar utilizadas pela api do serviço de entrega
 
apiRouter.route('/entrega') // Rota para retornar todos as entregas para requsiçoes get
.get(api.retriave); //Função que retorna todas as entregas

apiRouter.route('/entrega/:id') // Rota para retornar uma entrega pela identificação unica para requisições get
.get(api.retriaveById); //Função que retorna as entregas pela identificação unica.

module.exports = apiRouter; 