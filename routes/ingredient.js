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
