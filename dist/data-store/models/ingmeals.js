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