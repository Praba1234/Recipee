Lyte.Component.register("ingre-recipee-comp", {
_template:"<template tag-name=\"ingre-recipee-comp\"> <h1>Ingredents Recipes</h1> <template is=\"for\" items=\"{{ingrerecipee}}\" item=\"item\" index=\"index\"> <div class=\"size\"> <img class=\"photo\" src=\"{{item.strMealThumb}}\" onclick=\"{{action('namedetails',item.strMeal)}}\"> <span>{{item.strMeal}}</span> </div> </template> </template>\n<style>.size{\n\t/* border:1px solid black; */\n\twidth: 200px;\n\theight: 200px;\n\tmargin: 5px 15px;\n\tfloat: left;\n\ttext-align: center;\n}\n.photo{\n\twidth: 200px;\n\theight: 150px;\n\tbackground-size: cover;\n}</style>",
_dynamicNodes : [{"type":"attr","position":[3]},{"type":"for","position":[3],"dynamicNodes":[{"type":"attr","position":[1,1]},{"type":"text","position":[1,3,0]}]}],

_observedAttributes :["ingrerecipee"],
	data : function(){
		return {
			ingrerecipee : Lyte.attr('array')
		}		
	},
	actions : {
		namedetails : function(name){
			Lyte.Router.transitionTo('detail',name)
		}
	}
});
