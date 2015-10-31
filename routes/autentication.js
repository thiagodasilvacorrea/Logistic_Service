

module.exports = function(passport,app)
{  
	app.post('/signup', passport.authenticate('singnup', {
	     success:"logado com sucesso",
		 failure: "erro ao logar"
		
	
	}));

}
