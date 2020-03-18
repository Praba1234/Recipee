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