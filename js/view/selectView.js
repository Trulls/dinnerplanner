//ExampleView Object constructor
var SelectView = function (container, model, router) {
  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)

  var menuContainer = container.find('#menu-container');

  this.dishLink = container.find('.dish-picker');
  this.dropDown = container.find('select');

  // Functions
  this.addDishToMenu = function(dish) {
    menuContainer.append('<div class="course-container col-xs-2"><a href="description.html" data-id="'+dish.id+'"><div class="course-box"><img src="images/'+dish.image+'"></img><div class="course-name">'+dish.name+'</div></div><div>'+dish.description+'</div></a></div>');
  };
  this.show =function() {
    container.show();
  };

  this.hide = function() {
    container.hide();
  };

  this.update = function(category) {
    console.log("Update called: SelectView");
    menuContainer.html('');
    _.each(model.getAllDishes(category).toArray(), function(dish) {
      this.addDishToMenu(dish);
    }, this);
  };
};
