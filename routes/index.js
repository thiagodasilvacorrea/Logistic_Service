// Dependencias 

var express = require('express');
var apiRouter = express.Router()
var api = require ('../app/logisticProvider.js');

// Rotas para retornar utilizadas pela api do serviço de entrega
 
apiRouter.route('/entrega') // Rota para funções get e create.
.get(api.retriave) //Função que retorna todas as entregas.
.post(api.create); //Função que registra uma entrega.


apiRouter.route('/entrega/:id') // Rota para funções que necessitam de parametros.
.get(api.retriaveById) //Função que retorna as entregas pela identificação unica.
.put(api.update) // Função que atualiza os dados as entregas.
.delete(api.del);//Função que deleta uma entrega.

module.exports = apiRouter; 