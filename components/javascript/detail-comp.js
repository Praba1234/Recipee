Lyte.Component.register("detail-comp", {
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
