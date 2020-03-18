store.registerAdapter('ingmeals', {
	buildURL: function(modelName ,type ,queryParams ,payLoad ,url ,actionName ,customData){
		return 'https://www.themealdb.com/api/json/v1/1/filter.php';
	}
})