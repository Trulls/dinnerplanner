var ConfirmView = function (container, model) {

  // Fields
  var dishesContainer = container.find('#dinner-container');
  
  // Functions
  this.addDishToSelected = function(dish, update) {
    console.log("Function called: addDishToSelected()");
    dishesContainer.append('<div class="col-xs-3">'+
          '<div class="course-box">'+
            '<img src="images/'+dish.image+'"></img>'+
            '<div class="course-name">'+dish.name+'</div>'+
          '</div>'+
        '</div>');
  };
  this.setMenuPrice = function() {
    container.find('.menu-price').html(model.getTotalMenuPrice());
  };
  this.show =function() {
    container.show();
  };
  this.hide = function() {
    container.hide();
  };
  this.update = function() {
    console.log("Update called: ConfirmView");
    dishesContainer.html('');
    _.each(model.selectedDishes,function(dish) {
      this.addDishToSelected(dish);
      this.setMenuPrice();
    }, this);
      this.printButton = container.find('.print-button');
  };

  // Fields
  this.printButton = container.find('.print-button');

  // Main
  this.update();
  this.setMenuPrice();
};