store.registerSerializer ("ingmeals",{ 
    payloadKey  : function (modelName ,type ,key ,queryParams ,customData, opts ){ 
        return "meals";
     }
});