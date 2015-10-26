// Dependencies
var express = require('express');
var router = express.Router();
var model = require('../model/db.js');

// Mensagens de erro 

var mensagemErroConnexão = "Falha ao conectar ao banco";
//Variaveis utilizadas nas querys
var tabela = " Entregas";

// Querys 

var retriaveQuery = "select * from" + tabela;

//crud 

//Retornar todas as entregas
exports.retriave =function(req, res) {
	req.getConnection(function(err,connection){
		if(err) res.status(400).json(mensagemErroConnexão);
		connection.query(retriaveQuery,[],function(err,result){
			if(err) return res.status(400).json();

			return res.status(200).json(result);
		});
	});
}
