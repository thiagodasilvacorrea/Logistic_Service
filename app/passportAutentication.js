// Dependencies
var LocalStrategy   = require('passport-local').Strategy;
var express = require('express');
var router = express.Router();

var bcrypt  = require('bcrypt-nodejs');
// Mensagens
 
var mensagemErroConnexão = "Falha ao conectar ao banco";
var mensagemErroQuery = "Falha ao executar a query";
var mensagemNaoAutorizado = "È necessario antenticação para utilizar o recurso!";
var mensagemUsuariojaexiste = "Não foi possivel realizar o registro pois o usaurio já existe.Tente Novamente!";
var mensagemAcessoNegado = "Acesso negado!";

//Variaveis utilizadas nas querys==============================================

var tabela = ' Usuarios ';

// Querys======================================================================== 
var retiveQueryUserById = 'SELECT * FROM' +tabela+ 'WHERE id = ?';

var retriaveUserQuery = "select * from" + tabela;

var createUserQuery =  'INSERT INTO'+ tabela+ 'SET ?';

 var updatUserQuery = 'UPDATE'+tabela+ 'SET ? WHERE id = ? ';
 
 var deleteUserQuery = 'DELETE FROM '+tabela+ 'WHERE id = ? ';
 
var retiveQueryUserByEmail = 'SELECT * FROM' +tabela+ 'WHERE id = ?';

module.exports = function(passport,app) {

   // Usado para serializar o usuario  para a sessão.
    passport.serializeUser(function(user,done) {
        done(null, user.id);
    });

    // Usado para deserializar o usuaro
    passport.deserializeUser(function(id, done) {
        app.connection.query(retiveQueryUserById,[id], function(err, rows){
            done(err, rows[0]);
        });
    })
    
    
 //Estrategia de cadastro===================================================================================
    passport.use(
        'singnup',
        new LocalStrategy({
           
            usernameField : 'email',
            passwordField : 'senha',
            passReqToCallback : true // Permite enviar as requisições para callback.
        },
       
       function(req,res, email, senha, done) {
            //Verificar se o email já existe antes de criar .
            req.getConnection(function(err,connection){
                if(err)
                {
                    res.json(err);
                }
                connection.query(retiveQueryUserByEmail,[email], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, res.send(mensagemUsuariojaexiste));
                } else {
                            // Se o email não esta em uso.
                             // cria o email.
                              var newUserMysql = {
                                   email: email,
                                 senha: bcrypt.hashSync(senha, null, null)  
                                };
                        }
            });
              connection.query(retiveQueryUserByEmail,[email], function(err, rows) {
                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, res.send(mensagemUsuariojaexiste));
                } else {
                    // Se o email não esta em uso.
                    // cria o email.
                    var newUserMysql = {
                        email: email,
                        senha: req.bcrypt.hashSync(senha, null, null)  
                    };

                    
                    // Grava o usuario no banco.
                   req.connection.query(createUserQuery,[newUserMysql.email, newUserMysql.senha],function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        });
     })
    )

}