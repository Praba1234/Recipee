store.registerModel("meals", {
    idMeal: Lyte.attr('string',{primaryKey : true}),
    strMeal: Lyte.attr('string'),
    strCategory: Lyte.attr('string'),
    strArea: Lyte.attr('string')
});