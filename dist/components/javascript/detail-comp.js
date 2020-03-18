Lyte.Component.register("detail-comp", {
_template:"<template tag-name=\"detail-comp\"> <h1>DETAILS</h1> <h2>{{details.strMeal}}</h2> <div id=\"img_pic\"> <img src=\"{{details.strMealThumb}}\"> </div> <h2>Description</h2> <p>{{details.strInstructions}}</p> <a href=\"{{details.strYoutube}}\">Click here..</a> <h2>Ingredients</h2> <template is=\"for\" items=\"{{ingredients}}\" item=\"item\" index=\"index\"> <li onclick=\"{{action('IngreRecipee',item)}}\">{{item}}</li> </template> </template>\n<style>img{\n\twidth:300px;\n\theight: 300px;\n}\np{\n\tfont-size:1.2rem;\n\tword-spacing: 5px;\n\tline-height: 120%;\n}\nli{\n\tpadding: 5px;\n\tfont-size: 1.3rem;\n}\nli:hover{\n\tcolor:red;\n}</style>",
_dynamicNodes : [{"type":"text","position":[3,0]},{"type":"attr","position":[5,1]},{"type":"text","position":[9,0]},{"type":"attr","position":[11]},{"type":"attr","position":[15]},{"type":"for","position":[15],"dynamicNodes":[{"type":"attr","position":[1]},{"type":"text","position":[1,0]}]}],





_observedAttributes :["details","ingredients"],
	data : function(){
		return {
			details : Lyte.attr('object'),
			ingredients : Lyte.attr('array')
		}		
	},
	actions : {
		IngreRecipee : function(ingre){
			Lyte.Router.transitionTo('ingredient',ingre);
		}
	}
});
