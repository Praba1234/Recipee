Lyte.Component.register("ingre-recipee-comp", {
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
