Lyte.Router.registerRoute('index',{
	model : function()	{
		return store.findAll('meals',{f :'c'}); 
	},
	afterModel : function(model , params){
		console.log(model)
		this.currentModel = {
			'recipeenames' : model
   		};
	},
	renderTemplate : function()	{
		return {outlet : "#outlet",component : "welcome-comp"}
	}
});
