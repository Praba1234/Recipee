Lyte.Component.register("welcome-comp",{
_template:"<template tag-name=\"welcome-comp\"> <h1>Recipee Name</h1> <template is=\"for\" items=\"{{recipeenames}}\" item=\"item\" index=\"index\"> <h2 onclick=\"{{action('Recipedetails',item.strMeal)}}\">{{item.strMeal}}</h2> </template> </template>\n<style>h2:hover{\n    color: blue;\n}\nh1{\n    color:Red;\n}</style>",
_dynamicNodes: [{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}],
_observedAttributes :["recipeenames"],
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
