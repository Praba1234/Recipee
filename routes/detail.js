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
