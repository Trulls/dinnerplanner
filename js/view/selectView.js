//ExampleView Object constructor
var SelectView = function (container, model, router) {

  // Fields
  var menuContainer = container.find('#menu-container');

  // Links
  this.dishLink = container.find('.dish-picker');
  this.dropDown = container.find('select');
  this.input = container.find('input');

  // Functions
  this.addDishToMenu = function(dish) {
    menuContainer.append('<div class="course-container col-xs-3">' +
                            '<a href="description.html" data-id="'+dish.id+'">' +
                              '<div class="course-box">' +
                                '<img src="'+dish.image+'"></img>' +
                                '<div class="course-name">'+dish.name+'</div>' +
                              '</div>' +
                            '</a>' +
                          '</div>');
  };
  this.show =function() {
    container.show();
  };
  this.hide = function() {
    container.hide();
  };
  this.update = function(category, filter) {
    // console.log("Update called: SelectView");
    menuContainer.html('');
    filter = filter === '' ? undefined : filter
    _.each(model.getAllDishes(category, filter), function(dish) {
      this.addDishToMenu(dish);
    }, this);
  };
};
