var DescriptionView = function (container, model) {

  // Fields
  var dishContainer = container.find('#dish-description');

  // Functions

  this.addDishToDescription = function(dish) {
    dishContainer.append('<h1>'+dish.name+'</h1>' +
            '<img src="'+dish.image+'"></img>' +
            '<p>'+dish.description+'</p>'+
            '<a href="selectdish.html" class="btn start-button back-button">Back to Select Dish</a>'+
            '<h2>PREPARATION</h2>'+
            '<p>'+dish.instruction+'</p>');
    this.backButton = dishContainer.find('.back-button')
  };
  this.show =function() {
    container.show();
  };
  this.hide = function() {
    container.hide();
  };
  this.update = function(dish) {
    //console.log("Update called: DescriptionView");
    dishContainer.html('');
    this.addDishToDescription(dish);
  };
};
