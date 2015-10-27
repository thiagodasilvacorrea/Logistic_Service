// Dependencies
var express = require('express');
var router = express.Router();


// Mensagens
 
var mensagemErroConnexão = "Falha ao conectar ao banco";
var mensagemErroQuery = "Falha ao executar a query";

//Variaveis utilizadas nas querys

var tabela = ' Entregas ';

// Querys 
var retiveQueryById = 'SELECT * FROM' +tabela+ 'WHERE id = ?';

var retriaveQuery = "select * from" + tabela;

//crud============================================================================ 

//Retornar todas as entregas
exports.retriave =function(req, res) {
	
	req.getConnection(function(err,connection){
		
		if(err) res.status(400).json(mensagemErroConnexão);
		
		connection.query(retriaveQuery,[],function(err,result){
			if(err) return res.status(400).send(mensagemErroQuery);

			return res.status(200).json(result);
		});
	});
}


//Retornar entregas pelo id
exports.retriaveById = function(req, res) {
 	var id = req.params.id; //Variavel recebe o ip passado por parametro

	req.getConnection(function(err,connection){
		connection.query(retiveQueryById,[id],function(err,result){
			if(err) return res.status(400).json(mensagemErroQuery);

			return res.status(200).json(result[0]);
		});
	});
}