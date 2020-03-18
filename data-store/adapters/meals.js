store.registerAdapter('meals', {
	buildURL: function(modelName ,type ,queryParams ,payLoad ,url ,actionName ,customData){
		return 'https://www.themealdb.com/api/json/v1/1/search.php';
	}
})