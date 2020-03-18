// Lyte.Router.configureDefaults({baseURL:'',history : "html5"});

Lyte.Router.configureRoutes(function(){
	this.route('index',{path:'/'});
	this.route("detail",{ path :"/path:name"});
	this.route("ingredient",{ path :"/path:ingre"});
});

Lyte.Router.beforeRouteTransition = function() {
	//console.log('before Route Change');
}

Lyte.Router.afterRouteTransition = function() {
	//console.log('after Route Change');
}


Lyte.Router.registerRoute("detail",{
    model : function(params){
        let name = this.getDynamicParam();
		return store.findAll('meals',{s : name}); 
	},
	afterModel : function(model , params){
        var arr=[];
		var x;
		for(x in model[0]){
			if(x.startsWith('strIngredient') && model[0][x] != "" && model[0][x] != null){
				arr.push(model[0][x]);
			}
		}
		this.currentModel = {
            'details' : model[0],
            'ingredients' : arr
   		};
	},
	renderTemplate : function()	{
		return {outlet : "#outlet",component : "detail-comp"}
	}
});

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

Lyte.Router.registerRoute("ingredient",{
	model : function(){
        let ingre = this.getDynamicParam();
        return store.findAll('ingmeals',{i : ingre});
    },
    afterModel : function(model,params){
        console.log(model);
        this.currentModel = {
            'ingrerecipee' : model
        }
    },
    renderTemplate : function(){
        return {outlet : "#outlet",component : "ingre-recipee-comp"}
    }
});

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

store.registerModel("ingmeals", {
    idMeal: Lyte.attr('string',{primaryKey : true}),
    strMeal: Lyte.attr('string')
});
store.registerAdapter('ingmeals', {
	buildURL: function(modelName ,type ,queryParams ,payLoad ,url ,actionName ,customData){
		return 'https://www.themealdb.com/api/json/v1/1/filter.php';
	}
})
store.registerSerializer ("ingmeals",{ 
    payloadKey  : function (modelName ,type ,key ,queryParams ,customData, opts ){ 
        return "meals";
     }
});
store.registerModel("meals", {
    idMeal: Lyte.attr('string',{primaryKey : true}),
    strMeal: Lyte.attr('string'),
    strCategory: Lyte.attr('string'),
    strArea: Lyte.attr('string')
});
store.registerAdapter('meals', {
	buildURL: function(modelName ,type ,queryParams ,payLoad ,url ,actionName ,customData){
		return 'https://www.themealdb.com/api/json/v1/1/search.php';
	}
})