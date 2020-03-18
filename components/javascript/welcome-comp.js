Lyte.Component.register("welcome-comp",{
	data : function(){
		return {
			recipeenames : Lyte.attr("array")
		}
	},
	actions : {
		Recipedetails : function(name){
			console.log(name);
			Lyte.Router.transitionTo("detail",name);
		}
	}
});
