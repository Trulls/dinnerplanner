var PrintView = function (container, model) {
  // Get all the relevant elements of the view (ones that show data
  // and/or ones that responed to interaction)

  // Fields
  var dishesContainer = container.find('#print-view-box')
  // Functions
  this.addDishToSelected = function(dish) {
    console.log("Function called: addDishToSelected()");
    dishesContainer.append('<div class="row">'+
            '<div class="course-container course-box col-xs-2"><img src="images/'+dish.image+'"></img></div>'+
            '<div class="course-container col-xs-4">'+
                '<h1>'+dish.name+'</h1>'+
                '<br/>'+
                '<p>'+dish.description+'</p>'+
            '</div>'+
            '<div class="course-container col-xs-4">'+
                '<h2>PREPARATION</h2>'+
                '<br/>'+
                '<p>'+dish.description+'</p>'+
            '</div>'+
        '</div>');
  };

  this.show = function() {
    container.show();
  };

  this.hide = function() {
    container.hide();
  };

  this.update = function() {
    console.log("Update called: PrintView");
    dishesContainer.html('');
    _.each(model.selectedDishes,function(dish) {
      this.addDishToSelected(dish);
    }, this);
  };

  // Main
  this.update();
  this.numberOfGuests = container.find("#number-people");
};